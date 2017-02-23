'use strict';

angular.module('ezpAppCore').directive('ezpFieldvalueViewEzpage', [function() {
  return {
    scope: false,
    restrict: 'E',

    template:
'<p>Layout|i18n: {{::ezpage.layout}}</p>' +
'<p ng-repeat="zone in ::ezpage.zones">' +
    '<ul>' +
        '<li>identifier: {{ezpage.zones[$index].identifier}}</li>' +
//        '<li>id: {{::ezpage.zones[$index].id}}</li>' +
        '<li ng-repeat="block in ezpage.zones[$parent.$index].blocks">' +
            '{{ btoJson(ezpage.zones[$parent.$index].blocks[$index]) }}' +
        '</li>' +
    '</ul>' +
'</p>',

//    controllerAs: 'field',
    controller: ['$scope', function($scope) {
//      var field = this;
      $scope.ezpage = $scope.field.fieldValue;
      $scope.btoJson = function(obj) { return angular.toJson(obj); };
    }]
  };
}]);
