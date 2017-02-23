'use strict';

angular.module('ezpAppCore').directive('ezpContentView', [function() {
  return {
    scope: {},
    restrict: 'E',
//    replace: true,
    templateUrl: 'content/objects/content.view.html',
    controller: 'ezpContentViewCtrl',
    controllerAs: 'content',
    bindToController: {
      request: '=request',
      parent: '=parent',
      language: '=language'
    }
  };
}]);
