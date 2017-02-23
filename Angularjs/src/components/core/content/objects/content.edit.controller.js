'use strict';

// http://dwmkerr.github.io/angular-modal-service/
// http://www.dwmkerr.com/the-only-angularjs-modal-service-youll-ever-need/

angular.module('ezpAppCore').controller('ezpContentEditCtrl', ['$scope', '$timeout', '$filter', 'close', 'modalParams', 'dataFactory', 'messagesFactory', 'contentoperationsService', 'cjwWebStorageService',
  function($scope, $timeout, $filter, close, modalParams, dataFactory, messagesFactory, contentoperationsService, cjwWebStorageService) {
    var content = this;

    var response = cjwWebStorageService.get('ezpCurrentContent');

    content.id = response['_id'];
    content.remoteId = response['_remoteId'];
    content.name = response.Name;
    content.publishedDate = $filter('date')(response.publishedDate, 'short');
    content.lastModificationDate = $filter('date')(response.lastModificationDate, 'short');
    content.mainLanguageCode = response.mainLanguageCode;
    content.alwaysAvailable = response.alwaysAvailable;

    content.fields = response.CurrentVersion.Version.Fields.field;

    $timeout( function() {
      $scope.animate = true;
    }, 50);

    $scope.close = function(result) {
      $scope.animate = false;
      close(result, 450);
    };

    $scope.publish = function() {
      var createDraftParams = {
        method: 'COPY',
        url: '/content/objects/'+content.id+'/currentversion',
        mediaType: 'application/vnd.ez.api.Version'
      };

      // create a content draft from the current published version with content info request
      dataFactory.request(createDraftParams,true).then(function(createDraftResponse) {
        var draftVersionInfo = createDraftResponse.Version.VersionInfo;

        // tmp hook in the ezxml conversion hack
        var fieldsProcessed = contentoperationsService.contentFieldTypeProcessor(content.fields);

        var updateVersionStruct = {
          VersionUpdate: {
            initialLanguageCode: 'ger-DE',
            fields: {
//              field: content.fields
              field: fieldsProcessed
            }
          }
        };

        var updateVersionParams = {
          method: 'PATCH',
          url: '/content/objects/'+content.id+'/versions/'+draftVersionInfo.versionNo,
          mediaType: 'application/vnd.ez.api.Version',
          contentType: 'application/vnd.ez.api.VersionUpdate',
          data: updateVersionStruct
        };

        // update the new version draft
        dataFactory.request(updateVersionParams,true).then(function(updateVersionResponse) {
          var publishVersionParams = {
            method: 'PUBLISH',
            url: '/content/objects/'+content.id+'/versions/'+draftVersionInfo.versionNo
          };

          // publish it
          dataFactory.request(publishVersionParams,true).then(function(publishVersionResponse) {
            // purge location cache for parent parent location children
            // ToDo: if content object has more then one location
            cjwWebStorageService.remove(modalParams.parentLocationCacheKey+'/children');
            $scope.close(true);

          }, function(error) {
            messagesFactory.pushHttpErrorCodeMessage(error.status,'contentPublishVersion');
            $scope.close(false);
          });

        }, function(error) {
          messagesFactory.pushHttpErrorCodeMessage(error.status,'contentUpdateVersion');
          $scope.close(false);
        });

      }, function(error) {
        messagesFactory.pushHttpErrorCodeMessage(error.status,'contentCreateDraftFromCurrentVersion');
        $scope.close(false);
      });
    };
  }]);
