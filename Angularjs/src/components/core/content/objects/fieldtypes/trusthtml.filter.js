'use strict';

angular.module('ezpAppCore').filter('trusthtml', ['$sce', function($sce) {
  return function(text) {
    return $sce.trustAsHtml(text);
  };
}]);
