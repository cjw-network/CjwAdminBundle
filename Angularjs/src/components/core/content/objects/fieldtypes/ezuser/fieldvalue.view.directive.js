'use strict';

angular.module('ezpAppCore').directive('ezpFieldvalueViewEzuser', [function() {
  return {
    scope: false,
    restrict: 'E',
    template: '<p>Login: {{::field.fieldValue.login}}</p>' +
              '<p>Email: {{::field.fieldValue.email}}</p>' +
              '<p>Enabled: {{::field.fieldValue.enabled}}</p>',

    controller: ['$scope', function($scope) {
      console.log($scope.field.fieldValue);
    }]
  };
}]);
