angular.module('ezpAppCore').filter('translatevalue', ['settingsService', function(settingsService) {
  return function(value) {
    var result = value[0]['#text'];

    for(var idx in value) {
      if(value[idx]['_languageCode'] === settingsService.get('appSettings').defaultLanguage[0]) {
        result = value[idx]['#text'];
        break;
      }
    }

    return result;
  };
}]);
