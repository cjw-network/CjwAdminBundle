'use strict';

angular.module('ezpAppCore').directive('ezpFieldvalueViewEzxmltext', [function() {
  return {
    scope: false,
    restrict: 'E',
    template: '<div ng-bind-html="::field.fieldValue.xml|trusthtml"></div>',
    controller: ['$scope', '$timeout', 'ezxmlService', function($scope, $timeout, ezxmlService) {
//      var field = this;
//      field.fieldValue = ezxmlService.getHtmlFromEzxml(field.data.xml);
//      field.fieldValue = field.data.xml;
      $timeout( function() {
        $scope.field.fieldValue.xml = ezxmlService.getHtmlFromEzxml(angular.copy($scope.field.fieldValue.xml));
      }, 0);
    }]
//    controllerAs: 'field',
//    bindToController: {data: '=data'}
  };
}]);
