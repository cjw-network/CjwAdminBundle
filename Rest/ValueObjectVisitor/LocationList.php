<?php // https://github.com/ezsystems/ezpublish-kernel/blob/master/eZ/Publish/Core/REST/Server/Output/ValueObjectVisitor/LocationList.php

namespace Cjw\AdminAppBundle\Rest\ValueObjectVisitor;

use eZ\Publish\API\Repository\ContentService;
use eZ\Publish\Core\REST\Common\Output\ValueObjectVisitor;
use eZ\Publish\Core\REST\Common\Output\Generator;
use eZ\Publish\Core\REST\Common\Output\Visitor;

/**
 * LocationList value object visitor.
 */
class LocationList extends ValueObjectVisitor
{
    private $contentService;

    public function __construct(ContentService $contentService)
    {
        $this->contentService = $contentService;
    }

    /**
     * Visit struct returned by controllers.
     *
     * @param \eZ\Publish\Core\REST\Common\Output\Visitor $visitor
     * @param \eZ\Publish\Core\REST\Common\Output\Generator $generator
     * @param \eZ\Publish\Core\REST\Server\Values\LocationList $data
     */
    public function visit( Visitor $visitor, Generator $generator, $data )
    {
        $generator->startObjectElement( 'LocationList' );
        $visitor->setHeader( 'Content-Type', $generator->getMediaType( 'LocationList' ) );
        $generator->startAttribute( 'href', $data->path );
        $generator->endAttribute( 'href' );
        $generator->startList( 'Location' );
        foreach ( $data->locations as $restLocation ) {
            $location = $restLocation->location;
            $generator->startObjectElement( 'Location' );
            $generator->startAttribute(
                'href',
                $this->router->generate(
                    'ezpublish_rest_loadLocation',
                    array( 'locationPath' => trim( $location->pathString, '/' ) )
                )
            );
            $generator->endAttribute( 'href' );

            $generator->startValueElement( 'id', $location->id );
            $generator->endValueElement( 'id' );

            $generator->startValueElement( 'name', $location->contentInfo->name );
            $generator->endValueElement( 'name' );

            $generator->startValueElement( 'sectionId', $location->contentInfo->sectionId );
            $generator->endValueElement( 'sectionId' );

            $generator->startValueElement( 'contentType', $location->contentInfo->contentTypeId );
            $generator->endValueElement( 'contentType' );

            $generator->startValueElement( 'modificationDate', $location->contentInfo->modificationDate->format('c') );
            $generator->endValueElement('modificationDate');

            $generator->startValueElement( 'publishedDate', $location->contentInfo->publishedDate->format('c') );
            $generator->endValueElement('publishedDate');

            $generator->startValueElement('priority', $location->priority);
            $generator->endValueElement('priority');

            $generator->startValueElement( 'hidden', $this->serializeBool($generator, $location->hidden) );
            $generator->endValueElement('hidden');

            $generator->startValueElement( 'invisible', $this->serializeBool($generator, $location->invisible) );
            $generator->endValueElement('invisible');

            $generator->startValueElement( 'mainLanguageCode', $location->contentInfo->mainLanguageCode );
            $generator->endValueElement('mainLanguageCode');

            $contentVersionInfo = $this->contentService->loadVersionInfo( $location->contentInfo );
            $generator->startValueElement( 'languageCodes', implode(',', $contentVersionInfo->languageCodes) );
            $generator->endValueElement('languageCodes');

            $generator->startValueElement('childCount', $restLocation->childCount);
            $generator->endValueElement('childCount');

            $generator->startObjectElement('Children', 'LocationList');
            $generator->startAttribute(
                'href',
                $this->router->generate(
                    'ezpublish_rest_loadLocationChildren',
                    array(
                        'locationPath' => trim($location->pathString, '/'),
                    )
                )
            );
            $generator->endAttribute('href');
            $generator->endObjectElement('Children');

            $generator->endObjectElement( 'Location' );
        }
        $generator->endList( 'Location' );
        $generator->endObjectElement( 'LocationList' );
    }
}
