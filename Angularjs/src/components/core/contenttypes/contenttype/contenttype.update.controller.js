'use strict';

// http://dwmkerr.github.io/angular-modal-service/
// http://www.dwmkerr.com/the-only-angularjs-modal-service-youll-ever-need/

angular.module('ezpAppCore').controller('ezpContenttypeUpdateCtrl', ['$scope', '$timeout', 'close', 'modalParams', 'dataFactory', 'messagesFactory', 'cjwWebStorageService',
  function($scope, $timeout, close, modalParams, dataFactory, messagesFactory, cjwWebStorageService) {
    var contenttype = this;

    contenttype.fieldsInactive = {};
    contenttype.FieldTypeList = cjwWebStorageService.get('ezpFieldTypeList');

    contenttype.definition = cjwWebStorageService.get('ezpCurrentContentType');

    $timeout( function() {
      $scope.animate = true;
    }, 50);

    $scope.close = function(result) {
      $scope.animate = false;
      close(result, 450);
    };

    contenttype.fieldHide = function(id) {
      if(contenttype.fieldsInactive[id]) {
        contenttype.fieldsInactive[id] = false;
      } else {
        contenttype.fieldsInactive[id] = true;
      }
    };

    contenttype.fieldsCollapseExpand = function(action) {
      for(var field in contenttype.definition.FieldDefinitions.FieldDefinition) {
        contenttype.fieldsInactive[contenttype.definition.FieldDefinitions.FieldDefinition[field].id] = action;
      }
    };

    contenttype.publish = function() {
      // tmp hook, remove possible existing draft
      var removeDraftParams = { method: 'DELETE', url: '/content/types/'+contenttype.definition.id+'/draft' };
      dataFactory.request(removeDraftParams,true).then(function(removeDraftResponse) {
        publish();
      }, function(error) {
        publish();
      });

      function publish() {
        createContenttypeDraft(function() {
          updateFieldDefinitions(function() {
            publishContentTypeDraft();
$scope.close(true);
          });
        });
      }
    };

    // create and publish an contenttype draft
    function createContenttypeDraft(callback) {
      var contentTypeUpdateStruct = {
        ContentTypeUpdate: {
          identifier: contenttype.definition.identifier,
          mainLanguageCode: contenttype.definition.mainLanguageCode,
          urlAliasSchema: contenttype.definition.urlAliasSchema,
          nameSchema: contenttype.definition.nameSchema,
          isContainer: contenttype.definition.isContainer.toString(),
          defaultSortField: contenttype.definition.defaultSortField,
          defaultSortOrder: contenttype.definition.defaultSortOrder,
          defaultAlwaysAvailable: contenttype.definition.defaultAlwaysAvailable.toString(),
          names: { 'value': contenttype.definition.names.value },
          descriptions: { 'value': [ {
                '_languageCode': contenttype.definition.mainLanguageCode,
                '#text': contenttype.definition.descriptions.value[0]['#text']
              } ] }
        }
      };

      var createDraftParams = {
        method: 'POST',
        url: '/content/types/'+contenttype.definition.id,
//        mediaType: 'application/vnd.ez.api.ContentTypeInfo',
        contentType: 'application/vnd.ez.api.ContentTypeUpdate',
        data: angular.toJson(contentTypeUpdateStruct)
      };

      dataFactory.request(createDraftParams,true).then(function(createDraftResponse) {
        if(callback) { callback(); }
      }, function(error) {
        messagesFactory.pushHttpErrorCodeMessage(error.status,'general');
        $scope.close(false);
      });
    };

    function publishContentTypeDraft() {
      var publishDraftParams = {
        method: 'PUBLISH',
        url: '/content/types/'+contenttype.definition.id+'/draft',
        mediaType: 'application/vnd.ez.api.ContentType'
      };

      dataFactory.request(publishDraftParams,true).then(function(publishDraftResponse) {
//        $scope.close(true);
      }, function(error) {
        messagesFactory.pushHttpErrorCodeMessage(error.status,'general');
//        $scope.close(false);
      });
    }

    function updateFieldDefinitions(callback) {
      var resultCounter = 0;

      var fieldDefinitionUpdateStruct;
      var fieldDefinitions = contenttype.definition.FieldDefinitions.FieldDefinition;

      for(var idx in fieldDefinitions) {
        fieldDefinitionUpdateStruct = {
          FieldDefinitionUpdate: {
            identifier: fieldDefinitions[idx].identifier,
            fieldGroup: fieldDefinitions[idx].fieldGroup,
            position: fieldDefinitions[idx].position.toString(),
            fieldType: fieldDefinitions[idx].fieldType,
            defaultValue: fieldDefinitions[idx].defaultValue,   // this does not work with ezxmltext
            isTranslatable: fieldDefinitions[idx].isTranslatable.toString(),
            isRequired: fieldDefinitions[idx].isRequired.toString(),
            isInfoCollector: fieldDefinitions[idx].isInfoCollector.toString(),
            isSearchable: fieldDefinitions[idx].isSearchable.toString(),
            fieldSettings: fieldDefinitions[idx].fieldSettings,
            validatorConfiguration: fieldDefinitions[idx].validatorConfiguration,
            names: fieldDefinitions[idx].names,
            descriptions: fieldDefinitions[idx].descriptions
          }
        };

        // patch / fix for ezxmltext
        if(fieldDefinitions[idx].fieldType === 'ezxmltext') {
//          fieldDefinitionUpdateStruct.FieldDefinitionUpdate.defaultValue = {xml: '<?xml version="1.0" encoding="utf-8"?><section/>'};
// skips ezxmltext with an error
          fieldDefinitionUpdateStruct.FieldDefinitionUpdate.defaultValue = {xml:null};
        }

// Attention:
// the url should be '.../draft/fieldefinitions/...' (see ref doc), in 1411 it is '.../draft/fieldDefinitions/...' !!!
// the method should be 'PUT' !!!

        var updateFieldParams = {
          method: 'PATCH',
          url: '/content/types/'+contenttype.definition.id+'/draft/fieldDefinitions/'+fieldDefinitions[idx].id,
//          mediaType: 'application/vnd.ez.api.FieldDefinition',
          contentType: 'application/vnd.ez.api.FieldDefinitionUpdate',
          data: angular.toJson(fieldDefinitionUpdateStruct)
        };

        dataFactory.request(updateFieldParams,true).then(function(updateFieldResponse) {
          resultCounter++;
          if(resultCounter === fieldDefinitions.length) { callback(); }
        }, function(error) {
//          messagesFactory.pushHttpErrorCodeMessage(error.status,'general');
          resultCounter++;
          if(resultCounter === fieldDefinitions.length) { callback(); }
        });
      }
    }
  }]);
