'use strict';

angular.module('ezpAppCore').filter('getidfromhref', [function() {
  return function(object) {
    return object['_href'].split('/')[6];
  };
}]);
