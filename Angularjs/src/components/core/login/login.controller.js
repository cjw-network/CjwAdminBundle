'use strict';

angular.module('ezpAppCore').controller('ezpLoginCtrl', ['$cookies', '$location', 'cjwWebStorageService', 'settingsService', 'dataFactory',
  function($cookies, $location, cjwWebStorageService, settingsService, dataFactory) {
    var login = this;

    // disable sidebar and menu top
//    cjwWebStorageService.set('appHasMessage',{status:'off'});
    // this is needed for rebuilding top menu on page reload (F5), s.a. menutop.controller.js
    cjwWebStorageService.set('appHasMenuTop',{status:'off'},false,true);
//    cjwWebStorageService.set('appHasSidebar',{status:'off'});

    // remove all cookies (currently active login)
    var cookies = $cookies.getAll();
    for(var cookie in cookies) {
      $cookies.remove(cookie);
    }

    // request ez api root on load
    var rootRequestParams = { url: '/',  mediaType: 'application/vnd.ez.api.Root' };

    dataFactory.request(rootRequestParams,true).then(function(rootResponse) {
      // merge rootUserFolder
//      rootResponse.Root.rootUserFolder = settingsService.get('appSettings').rootUserFolder;
      cjwWebStorageService.set('ezpRoot',rootResponse.Root);

      login.sessionInput = { SessionInput: { login: '', password: '' } };

      login.requestAuth = function() {
        angular.extend(rootResponse.Root.createSession, {
          method: 'POST',
          contentType: 'application/vnd.ez.api.SessionInput+json',  // ToDo: wie geht das dynamisch?
          data: angular.toJson(login.sessionInput)
        });

        dataFactory.request(rootResponse.Root.createSession).then(function(sessionResponse) {
// $timeout( function() {
          var userId = sessionResponse.Session.User['_href'].split('/')[6]; // get current user id
          // sudo fn, obsolete?
          dataFactory.request({url: '/user/loggedin/'+userId,  mediaType: 'application/vnd.ez.api.PolicyList'}, true).then(function(response) {
// ToDo: session mit user id prefix
            cjwWebStorageService.set('ezpSession',sessionResponse.Session);
            cjwWebStorageService.set('ezpUser',response.User);
            cjwWebStorageService.set('ezpAccess',response.Access);
            cjwWebStorageService.set('ezpSectionList',response.Sections);
            cjwWebStorageService.set('ezpFieldTypeList',response.FieldTypes);
            cjwWebStorageService.set('ezpContentTypeList',response.ContentTypes);
            cjwWebStorageService.set('ezpSettings',response.Settings);

            // set home navigation part (also used in treemenu)
            cjwWebStorageService.set('appCurNaviPart',response.Settings.cjwadminapp_navigationparts.location_content);

            cjwWebStorageService.set('appHasMenuTop',{"status":"on"},false,true);

            // redirect to home
            $location.path(settingsService.get('appSettings').pathPrefix+settingsService.get('appSettings').pathHome);
          });
// }, 0);
        });
      };
    });
}]);
