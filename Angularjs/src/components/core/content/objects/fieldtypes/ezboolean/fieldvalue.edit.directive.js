'use strict';

angular.module('ezpAppCore').directive('ezpFieldvalueEditEzboolean', [function() {
  return {
//    scope: {},
    scope: false,
    restrict: 'E',
    template: '<input type="checkbox" ng-model="field.fieldValue" />'
/*
    controller: function() {
      var field = this;
      field.fieldValue = field.data;
    },
    controllerAs: 'field',
    bindToController: {data: '=data'}
*/
  };
}]);
