'use strict';

angular.module('ezpAppCore').directive('ezpFieldvalueEditEzurl', [function() {
  return {
    scope: false,
    restrict: 'E',
    template: '<input class="box" ng-model="field.fieldValue.link" placeholder="link" />' +
              '<input class="box" ng-model="field.fieldValue.text" placeholder="text" />'
  };
}]);
