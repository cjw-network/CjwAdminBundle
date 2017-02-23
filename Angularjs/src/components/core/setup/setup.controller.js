'use strict';

angular.module('ezpAppCore').controller('ezpSetupCtrl', ['$scope', '$routeParams', 'i18nSetupService', 'dataFactory', 'messagesFactory', 'cjwWebStorageService',
  function($scope, $routeParams, i18nSetupService, dataFactory, messagesFactory, cjwWebStorageService) {
    // inject the 'i18nSetupService' will "lazy load" the extra setup locale

    // set the sidebar menu
    cjwWebStorageService.set('appHasSidebar',{"status":"setup"},false,true);

    var setup = this;

    $scope.$on('appCurNaviPart', function(event,args) {   // ToDo: race condition, if you go to back to another tab
      // test inject rest route
      var parameters = { url: args.rest_route };

      // dynamic routing
/*
    var setupPart;
    if ($routeParams.setupPart) {
      setupPart = $routeParams.setupPart;
    }
*/
      var responseCached = false;

      var CacheKey = parameters.url;

//    if(settingsService.get('cacheSettings').setup) {
        responseCached = cjwWebStorageService.get(CacheKey);
//    }
responseCached = false;
      if(responseCached) {
        renderView(responseCached);
      } else {
        dataFactory.request(parameters,true).then(function(response) {
          renderView(response.Setup);
          cjwWebStorageService.set(CacheKey,response.Setup);
        }, function(error) {
          messagesFactory.pushHttpErrorCodeMessage(error.status,'general');
        });
      }
    });

    function renderView(response) {
      
    }
}]);
