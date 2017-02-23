'use strict';

angular.module('ezpAppCore').directive('ezpFieldvalueViewEzstring', [function() {
  return {
    scope: false,
    restrict: 'E',
    template: '<p ng-bind="::field.fieldValue"></p>'
  };
}]);
