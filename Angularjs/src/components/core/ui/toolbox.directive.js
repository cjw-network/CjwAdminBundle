angular.module('ezpAppCore').directive('cjwToolBox', function() {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,

    scope: {
      title: '@title',
      klass: '@class'
    },

    template:
'<div class="{{klass}} cjw-tool-box">' +
  '<div class="cjw-tool-box-title pointer" ng-click="contentShowHide()">' +
      '<p class="fa" ng-class="{ \'fa-arrow-down\': expanded, \'fa-arrow-up\': !expanded }"></p>' +
      '<p><strong>{{title}}</strong></p>' +
  '</div>' +
  '<div class="cjw-tool-box-body" ng-class="{hide:!expanded}">' +
    '<ng-transclude></ng-transclude>' +
  '</div>' +
'</div>',

    controller: ['$scope', function($scope) {
      $scope.expanded = true;

      $scope.contentShowHide = function() {
        if($scope.expanded) {
          $scope.expanded = false;
        } else {
          $scope.expanded = true;
        }
      };
    }]
  };
});
