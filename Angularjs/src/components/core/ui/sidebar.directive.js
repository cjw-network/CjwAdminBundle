'use strict';

angular.module('ezpAppCore').directive('ezpSidebar', [function() {
  return {
    scope: false,
    restrict: 'E',
    replace: true,
    controllerAs: 'sidebar',

    controller: ['$scope', function($scope) {
      var sidebar = this;

      sidebar.appHasSidebar = 'off';

      $scope.$on('appHasSidebar', function(event,args) {
          sidebar.appHasSidebar = args.status+'/menu.html';
      });
    }],

    template:
'<div class="left" id="sidebar" ng-if="sidebar.appHasSidebar != \'off\'">' +
  '<div ng-include="sidebar.appHasSidebar"></div>' +
'</div>'
  };
}]);
