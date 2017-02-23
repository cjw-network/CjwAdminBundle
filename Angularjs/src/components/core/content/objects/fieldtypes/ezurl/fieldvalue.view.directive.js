'use strict';

angular.module('ezpAppCore').directive('ezpFieldvalueViewEzurl', [function() {
  return {
    scope: false,
    restrict: 'E',
    template: '<p ng-bind="::field.fieldValue.link"></p><p ng-bind="::field.fieldValue.text"></p>'
  };
}]);
