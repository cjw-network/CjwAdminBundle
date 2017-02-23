'use strict';

angular.module('ezpAppCore').controller('ezpContentSearchCtrl', ['$routeParams', 'dataFactory', 'messagesFactory', 'cjwWebStorageService',
  function($routeParams, dataFactory, messagesFactory, cjwWebStorageService) {
    // enable sidebar
    cjwWebStorageService.set('appHasSidebar',{"status":"content"},false,true);

    var contentsearch = this;
    contentsearch.searchHits = false;
    contentsearch.totalCount = 0;

    var searchString;
    if ($routeParams.searchString) {
      searchString = $routeParams.searchString;
    }

    var parameters = {
      url: '/content/search/'+searchString   // ToDo: wash!
    };

    dataFactory.request(parameters,true).then(function(response) {
      contentsearch.searchHits = response.searchHits;
      contentsearch.totalCount = response.totalCount;
    }, function(error) {
      messagesFactory.pushHttpErrorCodeMessage(error.status,'general');
    });
}]);
