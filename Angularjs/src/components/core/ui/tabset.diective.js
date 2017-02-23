// http://codereview.stackexchange.com/questions/46927/angularjs-tab-control

angular.module('ezpAppCore').directive('cjwTabset', function() {
  return {
    restrict: 'E',
    transclude: true,

    template:
'<ul class="cjw-tabset">' +
'<li class="cjw-tab fa" ng-class="{ \'fa-arrow-down\': expanded, \'fa-arrow-up\': !expanded }" ng-click="contentShowHide()"></li>' +
'<li ng-repeat="tab in ::tabs" ng-class="{selected:tab.selected}" class="cjw-tab" ng-click="selectTab(tab);update();">{{tab.name}}</li>' +
'</ul>' +
'<ng-transclude></ng-transclude>',

    scope: false,

    controller: ['$scope', function($scope) {
      var selectedTabContentIdx = 0;
      $scope.expanded = true;
      $scope.tabs = [];

      this.addTab = function(tab) {
        $scope.tabs.push(tab);
      };

      $scope.selectTab = function(tab) {
        for(var i=0; i<$scope.tabs.length; i++) {
          if(tab.id !== $scope.tabs[i].id) {
            $scope.tabs[i].selected = false;
          } else {
            $scope.tabs[i].selected = true;
            selectedTabContentIdx = i;
            $scope.expanded = true;
          }
        }
      };

      $scope.contentShowHide = function() {
        if($scope.expanded) {
          $scope.tabs[selectedTabContentIdx].selected = false;
          $scope.expanded = false;
        } else {
          $scope.expanded = true;
          $scope.tabs[selectedTabContentIdx].selected = true;
        }
      };
    }]
  };
});

angular.module('ezpAppCore').directive('cjwTab', function() {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    require: '^cjwTabset',

    scope: {
      id: '@id',
      name: '@name'
    },

    template:
'<div id="{{id}}" ng-class="{selected:selected}" class="cjw-tab-content">' +
'<ng-transclude></ng-transclude>' +
'</div>',

    link: function(scope, element, attrs, ctrl) {
      scope.selected = attrs.selected === '' || attrs.selected === true;
      ctrl.addTab(scope);
    }
  };
});
/*
  mainModule.controller("DynamicTabController", ['$scope', function($scope){
    $scope.tabs = [
      { name: 'Tab1', id: 'Tab1'},
      { name: 'Tab2', id: 'Tab2'},
      { name: 'Tab3', id: 'Tab3'},
      { name: 'Tab4', id: 'Tab4'},
      { name: 'Tab5', id: 'Tab5'},
      { name: 'Tab6', id: 'Tab6'},
      { name: 'Tab7', id: 'Tab7'}
    ];
  }]);
*/