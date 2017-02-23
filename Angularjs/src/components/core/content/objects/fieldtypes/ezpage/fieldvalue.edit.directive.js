'use strict';

angular.module('ezpAppCore').directive('ezpFieldvalueEditEzpage', [function() {
  return {
    scope: false,
    restrict: 'E',
    template: '<textarea class="box" ng-bind="zones" placeholder="zones" disabled="disabled"></textarea>',
    controller: ['$scope', function($scope) {
      $scope.zones = angular.toJson($scope.field.fieldValue.zones);
    }]
  };
}]);
