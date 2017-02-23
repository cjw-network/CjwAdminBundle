'use strict';

angular.module('ezpAppCore').directive('ezpMenuTop', [function() {
  return {
    scope: false,
    restrict: 'E',
//    replace: true,
    controller: 'ezpMenuTopCtrl',
    controllerAs: 'menutop',
     templateUrl: 'ui/menutop.view.html'
  };
}]);
