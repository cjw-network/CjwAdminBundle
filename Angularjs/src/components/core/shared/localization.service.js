'use strict';

//prototype!
// ToDo: https://angularjs.de/artikel/angularjs-i18n-ng-translate

angular.module('ezpAppCore').service('i18nService', ['settingsService', function(settingsService) {
  var currentLanguage = settingsService.get('appSettings').defaultLanguage[1];

  var dictionary = { ui: {} };

  dictionary['ui']['en'] = {
    
  };

  dictionary['ui']['de'] = {
// top menu
    'Content': 'Inhalte',
    'Media': 'Medien',
    'User': 'Benutzer',
    'Roles': 'Rechte',
    'Classes': 'Klassen',
    'Setup': 'Setup',
    'Logout': 'Abmelden'  };

  var getString = function(key,component) {
    var string = key;
    if(component && dictionary.hasOwnProperty(component)) {
      if(dictionary[component][currentLanguage][key]) {
        string = dictionary[component][currentLanguage][key];
      }
    }
    return string;
  };

  var appendDictonary = function(key,append) {
    dictionary[key] = append;
  };

  return {
    appendDictonary: appendDictonary,
    setCurrentLanguage: function(newCurrentLanguage) { currentLanguage = newCurrentLanguage; },
    getCurrentLanguage: function() { return currentLanguage; },
    getString: getString
  };
}]);
