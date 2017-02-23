<?php

namespace Cjw\AdminAppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Yaml\Yaml;

class SessionController extends Controller
{
    protected $ContentTypelist;

    public function loggedInAction( $userId, Request $request )
    {
        $response = array();  // ToDo return 401

        $currentUser = unserialize( $request->getSession()->get('_security_ezpublish_front') )->getUser()->getAPIUser();
        $currentUserId = $currentUser->versionInfo->contentInfo->id;

// ToDo: check user enabled!!!, has session, try catch etc
        if($currentUserId == $userId) {
// sudo: http://www.mugo.ca/Blog/An-introduction-to-fetching-content-in-eZ-Publish-4-and-eZ-Publish-5
// temp prototyp: do super su
            $adminUserId = 14;  // ToDo: settings or sudo

            /** @var Repository $repository */
            $repository = $this->container->get( 'ezpublish.api.repository' );

            $userService = $repository->getUserService();

            // get / set admin rights
            $repository->setCurrentUser( $userService->loadUser( $adminUserId ) );

            $user = $userService->loadUser( $currentUserId );
            $userContentInfo = $user->getVersionInfo()->getContentInfo();

            // get a sections list
            $sectionService = $repository->getSectionService();
            $sections = $sectionService->loadSections();
            $response['Sections'] = array();
            foreach( $sections as $section )
            {
                $response['Sections'][$section->id] = array( $section->identifier, $section->name );
            }

            // get a fieldtype list
            $fieldTypeService = $repository->getFieldTypeService();
            $fieldTypes = $fieldTypeService->getFieldTypes();
            $response['FieldTypes'] = array();
            foreach( $fieldTypes as $key => $fieldType )
            {
                $response['FieldTypes'][] = $key;
            }

            // revert admin rights
            $repository->setCurrentUser( $userService->loadUser( $currentUserId ) );

            // get a content type list
            $this->ContentTypelist = $this->getContentTypeList();
            $response['ContentTypes'] = $this->ContentTypelist;

            $response['User'] = array(
                'id' => $userContentInfo->id,
                'name' => $userContentInfo->name,
                'login' => $user->login,
                'email' => $user->email
            );

            $response['Access'] = array();

            $hasAccessList = $repository->hasAccess( 'content', 'create' );

            $permissionsArr = $this->parseHasAccessList( $hasAccessList );

            $response['Access']['ContentCreate'] = $permissionsArr;

            $response['Settings'] = Yaml::parse( __DIR__.'/../Resources/config/adminapp.yml' );
        }

        return new JsonResponse( $response );
    }

    protected function parseHasAccessList( $hasAccessList )
    {
        $permissionsArr = array();

        if( $hasAccessList === true )  // aka admin, darf alles
        {
            // get content type list
            $permissionsArr = array( array( 'policies' => array( array( 'ContentTypeLimitation' => array_keys( $this->ContentTypelist ) ) ) ) );
        }
        else
        {
            if( $hasAccessList === false ) // darf nichts ?
            {

            }
            else
            {
                foreach( $hasAccessList as $permissionKey => $permission )
                {
                    $permissionsArr[$permissionKey] = array();

                    if( $permission['limitation'] )
                    {
                        $permissionsArr[$permissionKey][$this->getClassIdentifier( $permission['limitation'] )] = $permission['limitation']->limitationValues;
                    }

                    $permissionsArr[$permissionKey]['policies'] = array();
                    foreach( $permission['policies'] as $policiyKey => $policiy )
                    {
                        $limitations = array();

                        foreach( $policiy->limitations as $limitation )
                        {
                            $limitations[$this->getClassIdentifier( $limitation )] = $limitation->limitationValues;
                        }

                        $permissionsArr[$permissionKey]['policies'][$policiyKey] = $limitations;
                    }
                }
            }
        }

        return $permissionsArr;
    }

    protected function getClassIdentifier( $classIdentifier )
    {
        $classIdentifierReverse = array_reverse( explode( '\\', get_class( $classIdentifier ) ) );
        if( isset( $classIdentifierReverse['0'] ) ) {
            return $classIdentifierReverse['0'];
        }

        return false;
    }

    protected function getContentTypeList()
    {
        $repository = $this->container->get( 'ezpublish.api.repository' );
        $contentTypeService = $repository->getContentTypeService();

        $contentTypes = array();
        foreach( $contentTypeService->loadContentTypeGroups() as $contentTypeGroup )
        {
            foreach( $contentTypeService->loadContentTypes( $contentTypeGroup ) as $contentType )
            {
                $contentTypes[$contentType->id] = $contentType->identifier;
            }
        }

        return $contentTypes;
    }
}
