'use strict';

angular.module('ezpAppCore').factory('cjwWebStorageService', ['$rootScope', '$window', '$timeout', function($rootScope, $window, $timeout) {
  var prefix = 'ezpApp:';   // ToDo: domain, user / session mit reinbringen?
// ToDo: fallback to RAM


  var sessionStorage = {};

  sessionStorage.has = function() {
/* ToDo
    try {
      return ('sessionStorage' in $window && $window['sessionStorage'] !== null);
    } catch (e) {
      return false;
    }
*/
    return true;
  };

  sessionStorage.get = function(key) {
    var result = false;
    if(hasSessionStorage) {
      var json = $window.sessionStorage.getItem(prefix+key);
      if(json !== null) {
        try {
          result = angular.fromJson(json);
        } catch (e) {}
      }
    }
    return result;
  };

  sessionStorage.set = function(key,value) {
    if(hasSessionStorage) {
      var json = angular.toJson(value);
      $window.sessionStorage.setItem(prefix+key,json);
    }
    // ToDo: return result
  };

  sessionStorage.remove = function(key) {
    if(hasSessionStorage) {
      $window.sessionStorage.removeItem(prefix+key);
    }
  };


  var persistStorage = {};

  persistStorage.has = function() {
    try {
      return ('localStorage' in $window && $window['localStorage'] !== null);
    } catch (e) {
      return false;
    }
  };

  persistStorage.get = function(key) {
    var result = false;
    if(hasLocalStorage) {
      var json = localStorage.getItem(prefix+key);
      if(json !== null) {
        try {
          result = angular.fromJson(json);
        } catch (e) {}
      }
    }
    return result;
  };

  persistStorage.set = function(key,value) {
    if(hasLocalStorage) {
      localStorage.setItem(prefix+key, angular.toJson(value));
    }
    // ToDo: return result
  };

  persistStorage.remove = function(key) {
    if(hasLocalStorage) {
      localStorage.removeItem(prefix+key);
    }
  };


  var get = function(key,persist) {
    var result = false;
    result = sessionStorage.get(key);
    if(persist && !result) {
      result = persistStorage.get(key);
    }
    return result;
  };

  var set = function(key,value,persist,broadcast) {
    sessionStorage.set(key,value);
    if(persist) {
      persistStorage.set(key,value);
    }
    // ToDo: return, broadcast (conditinal?), localstorage timeout?
    if(broadcast) {
      $timeout( function() {
        $rootScope.$broadcast(key,value);
      }, 10);
    }
    return true;
  };

  var remove = function(key,persist) {
    sessionStorage.remove(key);
    if(persist) {
      persistStorage.remove(key);
    }
    return true;
    // ToDo: broadcast event? localstorage timeout?
  };


  var hasLocalStorage = persistStorage.has();
  var hasSessionStorage = sessionStorage.has();


  return {
    get: get,
    set: set,
    remove: remove
  };
}]);
