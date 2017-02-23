//prototype!
// ToDo: https://angularjs.de/artikel/angularjs-i18n-ng-translate
angular.module('ezpAppCore').filter('i18n', ['i18nService', function(i18nService) {
  return function(key,component) {
    return i18nService.getString(key,component);
  };
}]);
