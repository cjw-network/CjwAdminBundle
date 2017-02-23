<?php

namespace Cjw\AdminAppBundle\Controller;

use eZ\Publish\Core\REST\Server\Controller;
use eZ\Publish\Core\REST\Server\Values;
use eZ\Publish\API\Repository\Repository;
//use eZ\Publish\API\Repository\Values\Content\Query;
//use eZ\Publish\API\Repository\Values\Content\Query\Criterion;
use Cjw\AdminAppBundle\Rest\Values\LocationList as LocationList;
use Cjw\AdminAppBundle\Rest\Values\RestLocation as RestLocation;
use Cjw\AdminAppBundle\Rest\Values\RestContent as RestContent;
use Symfony\Component\HttpFoundation\Request;

class RestController extends Controller
{
    // https://github.com/ezsystems/ezpublish-kernel/blob/master/eZ/Publish/Core/REST/Server/Controller/Location.php
    /**
     * Loads child locations of a location.
     *
     * @param string $locationPath
     *
     * @return Cjw\AdminAppBundle\Rest\Values\LocationList
     */
    public function loadLocationChildrenAction( $locationPath, Request $request )
    {
        /** @var Repository $repository */
        $repository = $this->container->get( 'ezpublish.api.repository' );
        $locationService = $repository->getLocationService();

        $offset = $request->query->has( 'offset' ) ? (int)$request->query->get( 'offset' ) : 0;
        $limit = $request->query->has( 'limit' ) ? (int)$request->query->get( 'limit' ) : 50;
        $restLocations = array();
        $locationId = $this->extractLocationIdFromPath( $locationPath );

        $children = $locationService->loadLocationChildren(
            $locationService->loadLocation( $locationId ),
            $offset >= 0 ? $offset : 0,
            $limit >= 0 ? $limit : 50
        )->locations;

        foreach( $children as $key => $location ) {
//            $contentInfo = $repository->getContentService()->loadContentInfo( $location->contentId );
//            $contentVersionInfo = $repository->getContentService()->loadVersionInfo( $location->contentInfo );
//var_dump($contentVersionInfo);exit;
            $restLocations[] = new Values\RestLocation(
                $location,
//                $contentVersionInfo,
                $locationService->getLocationChildCount( $location )
//                0
            );
//            $restLocations[$key]['contentVersionInfo'] = $contentVersionInfo;
        }

        return new Values\CachedValue(
            new LocationList( $restLocations, $request->getPathInfo() ),
            array( 'locationId' => $locationId )
        );
    }

    /**
     * Loads all locations for content object
     *
     * @param mixed $contentId
     *
     * @return \eZ\Publish\Core\REST\Server\Values\LocationList
     */
    public function loadLocationsForContentAction( $contentId, Request $request )
    {
        $repository = $this->container->get( 'ezpublish.api.repository' );
        $locationService = $repository->getLocationService();
        $contentService = $repository->getContentService();

        $restLocations = array();
        $contentInfo = $contentService->loadContentInfo( $contentId );
        foreach ( $locationService->loadLocations( $contentInfo ) as $location )
        {
            $restLocations[] = new Values\RestLocation(
                $location,
                $locationService->getLocationChildCount( $location )
            );
        }

        return new Values\CachedValue(
            new LocationList( $restLocations, $request->getPathInfo() ),
            array( 'locationId' => $contentInfo->mainLocationId )
        );
    }

    // https://github.com/ezsystems/ezpublish-kernel/blob/master/eZ/Publish/Core/REST/Server/Controller/Location.php
    /**
     * Loads a location
     *
     * @param string $locationPath
     *
     * @return \eZ\Publish\Core\REST\Server\Values\RestLocation
     */
    public function loadLocationAction( $locationPath )
    {
        $repository = $this->container->get( 'ezpublish.api.repository' );
        $locationService = $repository->getLocationService();

        $location = $locationService->loadLocation(
            $this->extractLocationIdFromPath( $locationPath )
        );

        if( trim( $location->pathString, '/' ) != $locationPath )
        {
            throw new Exceptions\NotFoundException(
                "Could not find location with path string $locationPath"
            );
        }

        $contentInfo = $repository->getContentService()->loadContentInfo( $location->contentId );
        $contentType = $repository->getContentTypeService()->loadContentType( $contentInfo->contentTypeId ) ;

        $canEdit = false;
        if( $repository->canUser( 'content', 'edit', $contentInfo ) ) {
            $canEdit = true;
        }

        $canRemove = false;
        if( $repository->canUser( 'content', 'remove', $contentInfo ) ) {
            $canRemove = true;
        }

        $canMove = false;
        if( $repository->canUser( 'content', 'move', $contentInfo ) ) {
            $canMove = true;
        }

        $canCreate = false;
        if( $contentType->isContainer )
        {
            $canCreate = true;
        }

        return new Values\CachedValue(
            new RestLocation(
                $location,
                $locationService->getLocationChildCount( $location ),
                $canEdit,
                $canCreate,
                $canRemove,
                $canMove
            ),
            array( 'locationId' => $location->id )
        );
    }

    // https://github.com/ezsystems/ezpublish-kernel/blob/master/eZ/Publish/Core/REST/Server/Controller/Content.php
    /**
     * Loads a content info, potentially with the current version embedded.
     *
     * @param mixed $contentId
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return Cjw\AdminAppBundle\Rest\Values\RestContent
     */
    public function loadContentAction( $contentId, Request $request )
    {
        /** @var Repository $repository */
        $repository = $this->container->get( 'ezpublish.api.repository' );

        $contentInfo = $repository->getContentService()->loadContentInfo($contentId);

        $mainLocation = null;
        if (!empty($contentInfo->mainLocationId)) {
            $mainLocation = $repository->getLocationService()->loadLocation($contentInfo->mainLocationId);
        }

        $contentType = $repository->getContentTypeService()->loadContentType( $contentInfo->contentTypeId );
        $contentVersion = null;
        $relations = null;
        $languages = null;

        if ($this->getMediaType1($request) === 'application/vnd.ez.api.content') {
            if ($request->query->has('languages')) {
                $languages = explode(',', $request->query->get('languages'));
            }
            $contentVersion = $repository->getContentService()->loadContent($contentId, $languages);
            $relations = $repository->getContentService()->loadRelations($contentVersion->getVersionInfo());
        }
/*
        // http://apidoc.ez.no/doxygen/5.1.0/NS/html/interfaceeZ_1_1Publish_1_1API_1_1Repository_1_1Repository.html#ab828b31346624d4a0df94492035078ea
        $canEdit = false;
        if( $repository->canUser( 'content', 'edit', $contentInfo ) ) {
            $canEdit = true;
        }

        $canCreate = false;
        if( $contentType->isContainer )
        {
            $canCreate = true;
        }
*/
        $restContent = new RestContent(
            $contentInfo,
            $mainLocation,
            $contentVersion,
            $contentType,
            $relations,
            $request->getPathInfo(),
            $languages
        );

        if ($contentInfo->mainLocationId === null) {
            return $restContent;
        }

        return new Values\CachedValue(
            $restContent,
            array('locationId' => $contentInfo->mainLocationId)
        );
    }

    // https://github.com/ezsystems/ezpublish-kernel/blob/master/eZ/Publish/Core/REST/Server/Controller/Location.php
    /**
     * Extracts and returns an item id from a path, e.g. /1/2/58 => 58.
     *
     * @param string $path
     *
     * @return mixed
     */
    private function extractLocationIdFromPath($path)
    {
        $pathParts = explode('/', $path);
        return array_pop($pathParts);
    }

    // https://github.com/ezsystems/ezpublish-kernel/blob/master/eZ/Publish/Core/REST/Server/Controller.php
    /**
     * Extracts the requested media type from $request.
     *
     * @todo refactor, maybe to a REST Request with an accepts('content-type') method
     *
     * @return string
     */
    protected function getMediaType1(Request $request)
    {
        foreach ($request->getAcceptableContentTypes() as $mimeType) {
            if (preg_match('(^([a-z0-9-/.]+)\+.*$)', strtolower($mimeType), $matches)) {
                return $matches[1];
            }
        }
        return 'unknown/unknown';
    }
}
