'use strict';

angular.module('ezpAppCore').directive('ezpFieldvalueViewEzdatetime', [function() {
  return {
    scope: false,
    restrict: 'E',
    template: '<p ng-if="::field.fieldValue" ng-bind="::field.fieldValue.timestamp*1000|date:mediumDate"></p>'
  };
}]);
