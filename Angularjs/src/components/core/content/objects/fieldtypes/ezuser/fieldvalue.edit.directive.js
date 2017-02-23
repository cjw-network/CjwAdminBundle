'use strict';

angular.module('ezpAppCore').directive('ezpFieldvalueEditEzuser', [function() {
  return {
    scope: false,
    restrict: 'E',
    template: '<input class="halfbox inline" ng-model="field.fieldValue.login" placeholder="Login" />' +
              '<input class="halfbox inline" ng-model="field.fieldValue.email" placeholder="Email" /></p>' +
              '<p>Enabled: <input class="inline" type="checkbox" ng-model="field.fieldValue.enabled" /></p>',

    controller: ['$scope', function($scope) {
      console.log($scope.field.fieldValue);
    }]
  };
}]);
