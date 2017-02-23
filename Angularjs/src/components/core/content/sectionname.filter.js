angular.module('ezpAppCore').filter('sectionname', ['cjwWebStorageService', function(cjwWebStorageService) {
  return function(sectionId) {
    return cjwWebStorageService.get('ezpSectionList')[sectionId]['1'];
  };
}]);
