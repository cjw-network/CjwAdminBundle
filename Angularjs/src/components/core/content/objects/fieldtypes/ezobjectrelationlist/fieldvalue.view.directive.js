'use strict';

angular.module('ezpAppCore').directive('ezpFieldvalueViewEzobjectrelationlist', [function() {
  return {
    scope: false,
    restrict: 'E',
    template: '<p ng-if="::field.fieldValue.destinationContentIds" ng-bind="::field.fieldValue.destinationContentIds"></p>'
  };
}]);
