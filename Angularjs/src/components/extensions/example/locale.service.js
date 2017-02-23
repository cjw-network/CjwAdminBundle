angular.module('ezpAppExtensions').service('i18nExampleService', ['i18nService', function(i18nService) {
  var dictionary = {};

  dictionary['en'] = {
    
  };

  dictionary['de'] = {
    'Example': 'Beispiel',
    'Hello World': 'Hallo Welt'
  };

  i18nService.appendDictonary('example',dictionary);
}]);
