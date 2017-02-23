'use strict';

angular.module('ezpAppCore').directive('ezpFieldvalueEditEzobjectrelationlist', [function() {
  return {
    scope: false,
    restrict: 'E',
    template: '<input class="box" ng-model="field.fieldValue.destinationContentIds" disabled="disabled" />'
  };
}]);
