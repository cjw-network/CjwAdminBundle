(function() {
  'use strict';

  angular.module('ezpAppExtensions', []);

  angular.module('ezpAppExtensions').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    var pathPrefix = '/adminapp';

    $routeProvider.when(pathPrefix+'/example', {
      templateUrl: 'example/example.html',
      controller:  'ezpExampleCtrl',
      controllerAs: 'example'
    });

    $locationProvider.html5Mode({ enabled: true,  requireBase: false });
  }]);

  angular.module('ezpAppExtensions').config(['$compileProvider', function($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
  }]);
})();
