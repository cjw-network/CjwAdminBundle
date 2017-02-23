'use strict';

angular.module('ezpAppCore').directive('ezpFieldvalueViewEzboolean', [function() {
  return {
    scope: false,
    restrict: 'E',
    template: '<input type="checkbox" ng-bind="::field.fieldValue" disabled="disabled" />'
  };
}]);
