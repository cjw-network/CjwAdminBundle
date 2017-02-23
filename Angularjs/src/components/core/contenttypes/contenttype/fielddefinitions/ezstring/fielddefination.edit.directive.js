'use strict';

angular.module('ezpAppCore').directive('ezpFielddefinationEditEzstring', [function() {
  return {
    scope: false,
    restrict: 'E',
    template: '<input class="box" ng-model="field.fieldValue" ng-required="::field.isRequired" />'
  };
}]);
