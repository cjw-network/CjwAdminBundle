'use strict';

angular.module('ezpAppCore').controller('ezpContentTypesCtrl', ['$routeParams', 'i18nContenttypesService', 'dataFactory', 'messagesFactory', 'cjwWebStorageService', 'settingsService', 'modalService',
  function($routeParams, i18nContenttypesService, dataFactory, messagesFactory, cjwWebStorageService, settingsService, modalService) {
    // set sidebar
    cjwWebStorageService.set('appHasSidebar',{"status":"contenttypes"},false,true);

    var contenttypes = this;
    contenttypes.location = {};
    contenttypes.pathPrefix = settingsService.get('appSettings').pathPrefix;

    var request = {
      '_media-type': 'application\/vnd.ez.api.ContentTypeInfoList+json',
      '_href': settingsService.get('appSettings').ezpRestApiUrl + '/content/types'
    };

    // dynamic routing
    var contentTypeGroupId;
    if ($routeParams.contentTypeGroupId) {
      contentTypeGroupId = $routeParams.contentTypeGroupId;
      contenttypes.groupId = contentTypeGroupId;
      request['_href'] = settingsService.get('appSettings').ezpRestApiUrl + '/content/typegroups/'+contentTypeGroupId+'/types';
    }

    dataFactory.request(request).then(function(response) {
      contenttypes.list = response.ContentTypeInfoList.ContentType;
    }, function(error) {
      messagesFactory.pushHttpErrorCodeMessage(error.status,'general');
    });

    contenttypes.showModalCreate = function() {
      modalService.showModal({
        templateUrl: 'contenttypes/contenttype/contenttype.create.modal.html',
        controller: 'ezpContenttypeCreateCtrl as contenttype',
        inputs: { modalParams: {  } }
      }).then(function(modal) {
        modal.close.then(function(result) {
          if(result) {
            //
          }
        });
      });
    };
}]);
