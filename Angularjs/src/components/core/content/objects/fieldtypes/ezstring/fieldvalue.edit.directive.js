'use strict';

angular.module('ezpAppCore').directive('ezpFieldvalueEditEzstring', [function() {
  return {
    scope: false,
    restrict: 'E',
    template: '<input class="box" ng-model="field.fieldValue" ng-required="::field.isRequired" />'
  };
}]);
