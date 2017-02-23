'use strict';

angular.module('ezpAppExtensions').controller('ezpExampleCtrl', ['i18nExampleService', 'dataFactory', 'messagesFactory', 'cjwWebStorageService',
  function(i18nExampleService, dataFactory, messagesFactory, cjwWebStorageService) {

    // set sidebar
    cjwWebStorageService.set('appHasSidebar',{"status":"example"},false,true);

    var example = this;

    var parameters = {
      url: '/user/roles',
      mediaType: 'application/vnd.ez.api.RoleList'
    };

    var CacheKey = parameters.url;

    var responseCached = false;

//    if(settingsService.get('cacheSettings').example) {
      responseCached = cjwWebStorageService.get(CacheKey);
//    }

    if(responseCached) {
      renderView(responseCached);
    } else {
      dataFactory.request(parameters,true).then(function(response) {
        renderView(response.RoleList);
        cjwWebStorageService.set(CacheKey,response.RoleList);
      }, function(error) {
        messagesFactory.pushHttpErrorCodeMessage(error.status,'roleList');
      });
    }

    function renderView(response) {
      example.list = response.Role;
    }

}]);
