'use strict';

angular.module('ezpAppCore').directive('ezpFieldvalueEditEzdatetime', [function() {
  return {
    scope: false,
    restrict: 'E',
    template: '<datepicker class="halfbox" date-set="{{::dateSet}}" date-format="mediumDate">' +
                  '<input type="text" class="box datepicker-input" ng-model="field.fieldValue.internal" placeholder=" Choose a date" ng-required="::field.isRequired" />' +
              '</datepicker>',
    controller: ['$scope', '$filter', function($scope, $filter) {
      if($scope.field.fieldValue !== null) {
        $scope.field.fieldValue.internal = angular.copy($filter('date')($scope.field.fieldValue.timestamp*1000, 'mediumDate'));
        $scope.dateSet = $scope.field.fieldValue.internal;
      } else {  // when newly created (modell)
        $scope.field.fieldValue = { timestamp: '', rfc850: '', internal: '' };
      }
    }]
  };
}]);
