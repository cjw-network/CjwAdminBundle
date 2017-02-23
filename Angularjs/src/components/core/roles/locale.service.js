angular.module('ezpAppCore').service('i18nRolesService', ['i18nService', function(i18nService) {
  var dictionary = {};

  dictionary['en'] = {
    
  };

  dictionary['de'] = {
    'Roles': 'Rollen'
  };

  i18nService.appendDictonary('roles',dictionary);
}]);
