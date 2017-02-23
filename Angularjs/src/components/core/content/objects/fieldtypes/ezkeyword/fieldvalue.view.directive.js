'use strict';

angular.module('ezpAppCore').directive('ezpFieldvalueViewEzkeyword', [function() {
  return {
    scope: false,
    restrict: 'E',
    template: '<p ng-bind="::field.fieldValue"></p>'
  };
}]);
