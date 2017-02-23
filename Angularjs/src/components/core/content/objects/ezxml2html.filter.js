'use strict';

angular.module('ezpAppCore').filter('ezxml2html', ['ezxmlService', function(ezxmlService) {
  return function(ezXmlStr) {
    return ezxmlService.getHtmlFromEzxml(ezXmlStr);
  };
}]);
