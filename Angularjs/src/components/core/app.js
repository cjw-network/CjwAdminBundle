// https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md
(function() {
  'use strict';

  angular.module('ezpAppCore', ['ngRoute', 'ngCookies', 'ngAnimate', 'ngWig', '720kb.datepicker', 'dotjem.angular.tree']);

  angular.module('ezpAppCore').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    var pathPrefix = '/adminapp';

    $routeProvider.when(pathPrefix+'/location', {
      templateUrl: 'content/content.html',
      controller:  'ezpContentCtrl',
      controllerAs: 'content'
    });
    $routeProvider.when(pathPrefix+'/location/:locationId', {
      templateUrl: 'content/content.html',
      controller:  'ezpContentCtrl',
      controllerAs: 'content'
    });
    $routeProvider.when(pathPrefix+'/contentsearch', {
      templateUrl: 'content/content.search.html',
      controller:  'ezpContentSearchCtrl',
      controllerAs: 'contentsearch'
    });
    $routeProvider.when(pathPrefix+'/contentsearch/:searchString', {
      templateUrl: 'content/content.search.html',
      controller:  'ezpContentSearchCtrl',
      controllerAs: 'contentsearch'
    });
    $routeProvider.when(pathPrefix+'/roles', {
      templateUrl: 'roles/roles.html',
      controller:  'ezpRolesCtrl',
      controllerAs: 'roles'
    });
    $routeProvider.when(pathPrefix+'/roles/:roleId', {
      templateUrl: 'roles/roles.html',
      controller:  'ezpRolesCtrl',
      controllerAs: 'roles'
    });
    $routeProvider.when(pathPrefix+'/contenttypes', {
      templateUrl: 'contenttypes/contenttypes.html',
      controller:  'ezpContentTypesCtrl',
      controllerAs: 'contenttypes'
    });
    $routeProvider.when(pathPrefix+'/contenttypes/type/:contentTypeId', {
      templateUrl: 'contenttypes/contenttype/contenttype.view.html',
      controller:  'ezpContentTypeViewCtrl',
      controllerAs: 'contenttype'
    });
    $routeProvider.when(pathPrefix+'/contenttypes/group/:contentTypeGroupId', {
      templateUrl: 'contenttypes/contenttypes.html',
      controller:  'ezpContentTypesCtrl',
      controllerAs: 'contenttypes'
    });
    $routeProvider.when(pathPrefix+'/setup', {
      templateUrl: 'setup/setup.html',
      controller:  'ezpSetupCtrl',
      controllerAs: 'setup'
    });
    $routeProvider.when(pathPrefix, {
      templateUrl: 'login/login.html',
      controller:  'ezpLoginCtrl',
      controllerAs: 'login'
    });
    $routeProvider.otherwise({
      redirectTo: pathPrefix
    });

    // https://docs.angularjs.org/error/$location/nobase
//<script>document.write('<base href="' + document.location + '" />');</script>
    $locationProvider.html5Mode({ enabled: true,  requireBase: false });
  }]);

  angular.module('ezpAppCore').config(['$compileProvider', function($compileProvider) {
  // https://www.toptal.com/angular-js/top-18-most-common-angularjs-developer-mistakes
  // https://docs.angularjs.org/guide/production
  $compileProvider.debugInfoEnabled(false);
  // ToDo: ? 1.6.x upgrade https://github.com/angular/angular.js/blob/master/CHANGELOG.md (If you don't have time to migrate the code at the moment, you can flip the setting back to true)
  $compileProvider.preAssignBindingsEnabled(true);
  }]);
})();
