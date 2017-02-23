'use strict';

angular.module('ezpAppCore').directive('ezpLocationChildren', [function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'content/locations/location.children.html',
    controller: 'ezpLocationChildrenCtrl',
    controllerAs: 'children',
    bindToController: { request: '=request' }
  };
}]);
