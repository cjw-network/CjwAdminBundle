'use strict';

angular.module('ezpAppCore').factory('dataFactory', ['$http', 'settingsService', 'cjwWebStorageService', function($http, settingsService, cjwWebStorageService) {
  var pathPrefix = settingsService.get('appSettings').pathPrefix;
  var ezpRestApiUrl = settingsService.get('appSettings').ezpRestApiUrl;
  var ezpRestApiMediaType = settingsService.get('appSettings').ezpRestApiMediaType;
  var restApiMethodsOverrides = settingsService.get('restApiMethodsOverrides');

  var dataFactory = {};

  dataFactory.request = function(parameters,staticMode) {
    var config = {
      method: parameters.method || 'GET',
      url: parameters.url || parameters['_href'],
      cache: false,
      async: false,
//      timeout: 5000,
      headers: parameters.headers || {}
    };

    if(staticMode) {
      config.url = ezpRestApiUrl+config.url;
    }

    // match rest methods overrides
    if(config.method === 'GET') {   // ToDo: patch only if method == get?
      if(config.url.indexOf(pathPrefix) === -1) {  // prevent patching twice
        var matchRegexp;
        for(var override in restApiMethodsOverrides) {
          matchRegexp = new RegExp(restApiMethodsOverrides[override][0]);
          if(matchRegexp.test(config.url)) {
            config.url = config.url.replace(restApiMethodsOverrides[override][1], restApiMethodsOverrides[override][2]);
          }
        }
      }
    }

    if(config.method === 'POST') {
//      config.headers['Expect'] = '';
    }

    if(parameters.mediaType || parameters['_media-type']) {
      config.headers['Accept'] = parameters.mediaType || parameters['_media-type'];
      if(staticMode) {
        config.headers['Accept'] = config.headers['Accept']+'+'+ezpRestApiMediaType;
      }
    }

    if(parameters.contentType) {
      config.headers['Content-Type'] = parameters.contentType;
      if(staticMode) {
        config.headers['Content-Type'] = config.headers['Content-Type']+'+'+ezpRestApiMediaType;
      }
    }

    if(parameters.contentLength) {
      config.headers['Content-Length'] = parameters.contentLength;
    }

    var ezpSession = cjwWebStorageService.get('ezpSession');
    if(typeof ezpSession !== 'undefined') {
      config.headers['X-CSRF-Token'] = ezpSession.csrfToken;
    }

    if(parameters.data) {
      config.data = parameters.data;
    }

//    return $http(config);

    // http://stackoverflow.com/questions/12505760/processing-http-response-in-service
    // $http returns a promise, which has a then function, which also returns a promise
    var promise = $http(config).then(function (response) {
      // The then function here is an opportunity to modify the response
      // The return value gets picked up by the then in the controller.
      return response.data;
    });
// ToDo: catch errors

    // Return the promise to the controller
    return promise;
  };

  return dataFactory;
}]);
