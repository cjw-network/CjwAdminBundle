'use strict';

// http://dwmkerr.github.io/angular-modal-service/
// http://www.dwmkerr.com/the-only-angularjs-modal-service-youll-ever-need/

angular.module('ezpAppCore').controller('ezpContentCreateCtrl', ['$scope', '$timeout', 'close', 'modalParams', 'dataFactory', 'messagesFactory', 'contentoperationsService', 'cjwWebStorageService',
  function($scope, $timeout, close, modalParams, dataFactory, messagesFactory, contentoperationsService, cjwWebStorageService) {
    var content = this;

    var contentTypeId = modalParams.contentType;
    var pathStr = modalParams.pathStr;

    content.title = contentTypeId;
    content.fields = [];

    var url = '/content/types/'+contentTypeId;
    var CacheKey = url;

    var responseCached = cjwWebStorageService.get(CacheKey);
//responseCached = false;
    if(responseCached) {
      renderView(responseCached);
    } else {
      dataFactory.request({url: url, mediaType: 'application/vnd.ez.api.ContentType'}, true).then(function(response) {
        renderView(response.ContentType);
        cjwWebStorageService.set(CacheKey,response.ContentType);
      }, function(error) {
        messagesFactory.pushHttpErrorCodeMessage(error.status,'getContentType');
      });
    }

    function renderView(response) {
      var fieldDefinitions = response.FieldDefinitions.FieldDefinition;
      for(var key in fieldDefinitions) {
        content.fields[content.fields.length] = {
          id: null,
          fieldDefinitionIdentifier: fieldDefinitions[key].identifier,
          languageCode: 'ger-DE',
          fieldTypeIdentifier: fieldDefinitions[key].fieldType,
          isRequired: fieldDefinitions[key].isRequired,
          isInfoCollector: fieldDefinitions[key].isInfoCollector,
          defaultValue: fieldDefinitions[key].defaultValue,
          fieldValue: null
        };
      }
    }

    $timeout( function() {
      $scope.animate = true;
    }, 50);

    $scope.close = function(result) {
      $scope.animate = false;
      close(result, 450);
    };

    $scope.publish = function() {
      var newContentStructParams = {
        contentTypeId: contentTypeId,
        mainLanguageCode: 'ger-DE',
        parentLocation: pathStr,
        sectionId: '1'
      };

      var newContentStruct = contentoperationsService.getNewContentStruct( newContentStructParams );

      // tmp hook in the ezxml conversion hack
      var fieldsProcessed = contentoperationsService.contentFieldTypeProcessor(content.fields);

//      newContentStruct.ContentCreate.fields.field = content.fields;
      newContentStruct.ContentCreate.fields.field = fieldsProcessed;

      var postBodyData = angular.toJson(newContentStruct);

      var createContentDraftRequestParams = {
        method: 'POST',
        url: '/content/objects',
        mediaType: 'application/vnd.ez.api.ContentInfo',
        contentType: 'application/vnd.ez.api.ContentCreate',
        contentLength: postBodyData.length,
        data: postBodyData
      };

      // create a new content draft
      dataFactory.request(createContentDraftRequestParams,true).then(function(createContentDraftResponse) {
        var publishVersionParams = {
          method: 'PUBLISH',
          url: '/content/objects/'+createContentDraftResponse.Content['_id']+'/versions/1'
        };

        // publish the content (draft)
        dataFactory.request(publishVersionParams,true).then(function(publishVersionResponse) {
          // purge location cache for parent location and children
          // ToDo: if content object has more then one location
          cjwWebStorageService.remove('/content/locations'+pathStr+'/children');
          cjwWebStorageService.remove('/content/locations'+pathStr);

          dataFactory.request(createContentDraftResponse.Content.Locations).then(function(response) {
            // return the new main location for redirect
            $scope.close(response.LocationList.Location['0']['_href']);

          }, function(error) {
            messagesFactory.pushHttpErrorCodeMessage(error.status,'locationLoadByPath');
            $scope.close(false);
          });

        }, function(error) {
          messagesFactory.pushHttpErrorCodeMessage(error.status,'contentPublishVersion');
          $scope.close(false);
        });

      }, function(error) {
        messagesFactory.pushHttpErrorCodeMessage(error.status,'contentCreateDraft');
        $scope.close(false);
      });
    };
  }]);
