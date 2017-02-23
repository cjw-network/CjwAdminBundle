'use strict';

angular.module('ezpAppCore').directive('ezpFieldvalueEditEzxmltext', [function() {
  return {
    scope: false,
    restrict: 'E',
    template: '<textarea class="box" ng-wig="field.fieldValue.xml" source-mode-allowed></textarea>' +
              '<div class="break" style="margin-bottom: 1em"></div>',
    controller: ['$scope', '$timeout', 'ezxmlService', function($scope, $timeout, ezxmlService) {
//      var field = this;
      if($scope.field.fieldValue !== null) {
        $timeout( function() {
          $scope.field.fieldValue.xml = ezxmlService.getHtmlFromEzxml($scope.field.fieldValue.xml);
        }, 0);
      } else {  // when newly created (modell)
        $scope.field.fieldValue = { xml: '' };
      }
//      field.fieldValue = field.data.xml;
    }]
//    controllerAs: 'field',
//    bindToController: {data: '=data'}
  };
}]);
