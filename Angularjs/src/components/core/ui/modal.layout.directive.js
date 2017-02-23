'use strict';

angular.module('ezpAppCore').directive('ezpModalLayout', [function() {
  return {
    scope: false,
    restrict: 'E',
    replace: true,
    templateUrl: 'ui/modal.layout.template.html'
  };
}]);
