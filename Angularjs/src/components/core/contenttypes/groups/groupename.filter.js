'use strict';

angular.module('ezpAppCore').filter('contenttypegroupename', ['cjwWebStorageService', function(cjwWebStorageService) {
  return function(groupId) {
    var result = cjwWebStorageService.get('/content/typegroups');
    if(result && result.hasOwnProperty(groupId)) {
      result = result[groupId].identifier;
    } else {
      result = false;
    }
    return result;
  };
}]);
