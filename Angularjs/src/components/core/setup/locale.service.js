angular.module('ezpAppCore').service('i18nSetupService', ['i18nService', function(i18nService) {
  var dictionary = {};

  dictionary['en'] = {
    
  };

  dictionary['de'] = {
    'Setup': 'Setup',
    'Cache': 'Cache löschen',
    'Sections': 'Sektionen',
    'Languages': 'Sprachen'
  };

  i18nService.appendDictonary('setup',dictionary);
}]);
