'use strict';

angular.module('ezpAppCore').directive('ezpFieldvalueEditEzkeyword', [function() {
  return {
//    scope: {},
    scope: false,
    restrict: 'E',
    template: '<input class="box" ng-model="field.fieldValue" disabled="disabled" />'
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
