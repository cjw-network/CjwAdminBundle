angular.module('ezpAppCore').factory('settingsService', [function() {
  var settingsObj = {};

//  settingsObj.appCtrl = { environment : 'production' };

  settingsObj.appSettings = {
    ezpRestApiUrl: '/api/ezp/v2',
    ezpRestApiMediaType: 'json',
    pathPrefix: '/adminapp',
    pathHome: '/location',
    pathAssets: '/bundles/cjwadminapp',
    defaultImageVariation: 'medium',
//    defaultLanguage: [ 'ger-DE', 'de' ]
    defaultLanguage: [ 'eng-GB', 'en' ]
  };

  settingsObj.restApiMethodsOverrides = [
    [ '/user/loggedin/[0-9]*$', '/user/loggedin/', settingsObj.appSettings.pathPrefix + '/user/loggedin/' ],
    [ '/content/locations/', '/content/locations/', settingsObj.appSettings.pathPrefix + '/content/locations/' ],
    [ '/content/search/', '/content/search/', settingsObj.appSettings.pathPrefix + '/content/search/' ],
//    [ '/children$', '/content/locations/', settingsObj.appSettings.pathPrefix + '/content/locations/' ],
    [ '/content/objects/[0-9]*(\\?languages=.*)$', '/content/objects/', settingsObj.appSettings.pathPrefix + '/content/objects/' ],
    [ '/content/objects/[0-9]*/locations$', '/content/objects/', settingsObj.appSettings.pathPrefix + '/content/objects/' ]
  ];

  settingsObj.cacheSettings = {
    locations: true,
    locationChildren: true,
    objectProperties: true
  };

  // 1x1.gif use for triger imgonload event
  settingsObj.dummyImg = 'data:image/gif;base64,R0lGODdhAQABAIAAAP///////ywAAAAAAQABAAACAkQBADs=';

  return {
    get : function(key) { return settingsObj[key]; },
    set: function(key, value) { settingsObj[key] = value; }
  };
}]);
