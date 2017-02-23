'use strict';

angular.module('ezpAppCore').directive('ezpLocationPath', [function() {
  return {
    scope: {},
    restrict: 'E',
    replace: true,
    controller: 'ezpLocationPathCtrl',
    controllerAs: 'path',
    bindToController: { pathstring: '=pathstring' },

    template:
'<span ng-repeat="pathItem in path.items">' +
'    <span ng-if="!$first" class="fa fa-caret-right "></span>' +
'    <a ng-href="{{pathItem.path|getapproute:location}}">{{pathItem.name}}</a>' +
'</span>'
  };
}]);
