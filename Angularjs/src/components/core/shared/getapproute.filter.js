'use strict';

angular.module('ezpAppCore').filter('getapproute', ['settingsService', function(settingsService) {
  return function(href,component) {
    var pathStr = href;

    if(component === 'roles') {
/*
      var pathStrArr = href.split('/roles');
      if(pathStrArr[1]) {
        pathStr = pathStrArr[1];
      }
      pathStr = pathStr.slice(1);
      pathStr = pathStr.replace(/\//g,'-');
      pathStr = settingsService.get('appSettings').pathPrefix+'/roles/'+pathStr;
*/
    } else { // component = location
      var pathStrArr = href.split('/locations');
      if(pathStrArr[1]) {
        pathStr = pathStrArr[1];
      }
      pathStr = pathStr.slice(1);
      pathStr = pathStr.replace(/\//g,'-');
      pathStr = settingsService.get('appSettings').pathPrefix+settingsService.get('appSettings').pathHome+'/'+pathStr;
    }

    return pathStr;
  };
}]);
