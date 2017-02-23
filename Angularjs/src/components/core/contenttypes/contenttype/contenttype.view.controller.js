angular.module('ezpAppCore').controller('ezpContentTypeViewCtrl', ['$routeParams', 'i18nContenttypesService', 'dataFactory', 'messagesFactory', 'cjwWebStorageService', 'settingsService', 'modalService',
  function($routeParams, i18nContenttypesService, dataFactory, messagesFactory, cjwWebStorageService, settingsService, modalService) {
    // set sidebar
    cjwWebStorageService.set('appHasSidebar',{"status":"contenttypes"},false,true);

    var contenttype = this;
    contenttype.location = {};

    loadContentType();

    function loadContentType() {
      var request = {
        '_media-type': 'application\/vnd.ez.api.ContentTypeInfoList+json',
        '_href': settingsService.get('appSettings').ezpRestApiUrl + '/content/types/' + $routeParams.contentTypeId
      };

      dataFactory.request(request).then(function(response) {
        contenttype.definition = response.ContentType;
        contenttype.mainLanguageCode = response.ContentType.mainLanguageCode;
        cjwWebStorageService.set('ezpCurrentContentType',response.ContentType);
      }, function(error) {
        messagesFactory.pushHttpErrorCodeMessage(error.status,'general');
      });
    };

    contenttype.showModalUpdate = function() {
      modalService.showModal({
        templateUrl: 'contenttypes/contenttype/contenttype.update.modal.html',
        controller: 'ezpContenttypeUpdateCtrl as contenttype',
        inputs: { modalParams: {  } }
      }).then(function(modal) {
        modal.close.then(function(result) {
          if(result) {
//            $route.reload();
            loadContentType();
          }
        });
      });
    };

    contenttype.showModalRemove = function() {
      modalService.showModal({
        templateUrl: 'contenttypes/contenttype/contenttype.remove.modal.html',
        controller: 'ezpContenttypeRemoveCtrl as contenttype',
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
