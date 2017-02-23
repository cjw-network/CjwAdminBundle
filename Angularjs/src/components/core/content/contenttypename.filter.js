'use strict';

angular.module('ezpAppCore').filter('contenttypename', ['cjwWebStorageService', function(cjwWebStorageService) {
  return function(contentTypeId) {
    return cjwWebStorageService.get('ezpContentTypeList')[contentTypeId];
  };
}]);
