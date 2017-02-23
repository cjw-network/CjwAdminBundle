// ToDo: implement user permissions

angular.module('ezpAppCore').controller('ezpMenuTopCtrl', ['$scope', 'settingsService', 'cjwWebStorageService',
  function($scope, settingsService, cjwWebStorageService) {
    var menutop = this;
    menutop.pathPrefix = settingsService.get('appSettings').pathPrefix;
    menutop.navigationParts = [];
    menutop.selectedItem = 0;

    var navigationparts, navigationpart;

    // this is needed for rebuilding top menu on page reload (F5), s.a. login.controller.js
    buildMenuTop(true);

    menutop.selection = function(idx,naviPart) {
      menutop.selectedItem = idx;
      cjwWebStorageService.set('appCurNaviPart',naviPart,false,true);
    };

    $scope.$on('appHasMenuTop', function(event,args) {
      buildMenuTop(args.status);
    });

    function buildMenuTop(appHasMenuTop) {
      menutop.navigationParts.length = 0;
      menutop.appHasMenuTop = false;

      if(cjwWebStorageService.get('appHasMenuTop').status === 'on') {
        menutop.appHasMenuTop = appHasMenuTop;

        if(appHasMenuTop !== false) {
          navigationparts = cjwWebStorageService.get('ezpSettings').cjwadminapp_navigationparts;

          for(var idx in navigationparts) {
            navigationpart = navigationparts[idx];
            if(navigationpart.enabled && navigationpart.name && navigationpart.href) {
              menutop.navigationParts[menutop.navigationParts.length] = navigationpart;
            }
          }

          menutop.navigationParts[menutop.navigationParts.length] = { name: 'Logout', href: '/', self: true };
        }
      }
    }
}]);
