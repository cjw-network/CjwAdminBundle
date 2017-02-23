<?php

namespace Cjw\AdminAppBundle\Controller;

//use eZ\Publish\Core\REST\Server\Controller;
//use eZ\Publish\Core\REST\Server\Values;
//use eZ\Publish\API\Repository\Repository;
//use eZ\Publish\API\Repository\Values\Content\Query;
//use eZ\Publish\API\Repository\Values\Content\Query\Criterion;
use Symfony\Component\HttpFoundation\JsonResponse;
use eZ\Bundle\EzPublishCoreBundle\Controller;
use eZFunctionHandler;

class SearchController extends Controller
{
    /*
     * 
     */
//    public function searchContentAction( $searchText, Request $request )
    public function searchContentAction( $searchText )
    {
/* does not work reliable
        $repository = $this->container->get( 'ezpublish.api.repository' );
        $searchService = $repository->getSearchService();

        $criteria = array(
            new Criterion\FullText( $searchText ),
//            new Criterion\Visibility(Criterion\Visibility::VISIBLE),
            new Criterion\Subtree( "/1/2/" ),
//            new Criterion\ContentTypeIdentifier( [ 'article' ] ),
        );

        $query = new Query(
            array(
                'limit' => 50,
                'offset' => 0,
                'criterion' => new Criterion\LogicalAnd($criteria),
//                'sortClauses' => array(
//                    new SortClause\Field('article', 'publish_date', Query::SORT_DESC, $this->getCurrentLanguage()),
//                    new SortClause\DatePublished(Query::SORT_DESC)
//                )
            )
        );

        $searchResult = $searchService->findContent( $query );
*/
        $offset = 0;
        $limit = 50;
        $subtree = 2;
// ToDo: settings
        if($searchText != '')
        {
            $resultList = $this->getLegacyKernel()->runCallback(
                function () use ( $searchText, $subtree, $offset, $limit )
                {
                    return eZFunctionHandler::execute( 'content', 'search', array( 'text'          => $searchText,
                                                                                   'subtree_array' => array( $subtree ),
                                                                                   'offset'        => $offset,
                                                                                   'limit'         => $limit,
                                                                                   'section_id'    => array( 1 ),
                                                                                   'class_id'      => array( 16, 21, 22, 56, 67, 68, 69 )
//                                                                                   'sort_by'       => array( array( 'attribute', false, '188' ),
//                                                                                                             array( 'published', false ) ) ) );
//                                                                                   'sort_by'       => array( 'published', false )
                        ) );
                }
            );

            $searchResult = array();
            $searchResult['searchHits'] = $resultList['SearchResult'];
            $searchResult['totalCount'] = $resultList['SearchCount'];
        }

        return new JsonResponse( $searchResult );
    }
}
