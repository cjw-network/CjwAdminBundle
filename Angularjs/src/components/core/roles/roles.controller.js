'use strict';

angular.module('ezpAppCore').controller('ezpRolesCtrl', ['$scope', '$rootScope', '$routeParams', 'i18nRolesService', 'dataFactory', 'messagesFactory', 'cjwWebStorageService',
  function($scope, $rootScope, $routeParams, i18nRolesService, dataFactory, messagesFactory, cjwWebStorageService) {
    // set sidebar
    cjwWebStorageService.set('appHasSidebar',{"status":"roles"},false,true);

    var roles = this;
    roles.location = {};

    // dynamic routing
//    var rootLocationHref = '/api/ezp/v2/user/roles';
    var rolesId;
    if ($routeParams.rolesId) {
      rolesId = $routeParams.rolesId;
    } else {
//      rolesId = rootLocationHref.split('/user/roles/')[1].replace(/\//g,'-');
    }

    var parameters = {
//      url: '/user/roles/'+rolesId.replace(/-/g,'/'),
      url: '/user/roles',
      mediaType: 'application/vnd.ez.api.RoleList'
    };

//    var CacheKey = parameters.url;

    var responseCached = false;
/*
    if(settingsService.get('cacheSettings').roles) {
      responseCached = cjwWebStorageService.get(CacheKey);
    }
*/
    if(responseCached) {
      renderView(responseCached);
    } else {
      dataFactory.request(parameters,true).then(function(response) {
        renderView(response.RoleList);
//        cjwWebStorageService.set(CacheKey,response.RoleList);
      }, function(error) {
        messagesFactory.pushHttpErrorCodeMessage(error.status,'roleList');
      });
    }

    function renderView(response) {
      roles.list = response.Role;
    }
}]);
