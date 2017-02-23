angular.module('ezpAppCore').directive('ezpSearchBox', function() {
  return {
    restrict: 'E',
    replace: true,

    scope: {},

    template:
'<form id="ezp-search-box">' +
    '<input style="width: 95%;margin: 0 0 0.5rem 0;" placeholder="{{\'Search in content\'|i18n:\'content\'}}" ng-model="searchbox.searchString" />' +
    '<button style="width: 95%;" ng-click="searchbox.searchContent()">{{\'Search\'|i18n:\'content\'}}</button>' +
'</form>',

    controllerAs: 'searchbox',
    controller: ['$location', function($location) {
        var searchbox = this;

        searchbox.searchString = '';

        searchbox.searchContent = function() {
          $location.path('/adminapp/contentsearch/'+searchbox.searchString);
        };
    }]
  };
});
