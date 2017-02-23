'use strict';

angular.module('ezpAppCore').factory('contentoperationsService', ['settingsService', 'ezxmlService', function(settingsService, ezxmlService) {
  var contentoperationsService = {};


  contentoperationsService.getNewContentStruct = function(params) {
    var ezpRestApiUrl = settingsService.get('appSettings').ezpRestApiUrl;

    var contentCreateStruct = {
      ContentCreate: {
        ContentType: {
          '_href': ezpRestApiUrl + '/content/types/' + params.contentTypeId
        },
        Section: {
          '_href': ezpRestApiUrl + '/content/sections/' + params.sectionId
        },
        mainLanguageCode: params.mainLanguageCode,
//        remoteId: params.remoteId,
        LocationCreate: {
          ParentLocation: {
            '_href': ezpRestApiUrl + '/content/locations' + params.parentLocation
          },
          hidden: 'false',
          sortField: 'PATH',
          sortOrder: 'ASC'
        },
        fields: { field: [] }
      }
    };

    return contentCreateStruct;
  };


  contentoperationsService.contentFieldTypeProcessor = function(contentFields) {
    var fieldsProcessed = [];
    var fieldTemp;

    for(var key in contentFields) {
      if(contentFields[key].fieldValue !== null) {
        fieldTemp = angular.copy(contentFields[key]);

        if(contentFields[key].fieldTypeIdentifier === 'ezxmltext') {
          fieldTemp.fieldValue.xml = ezxmlService.getEzxmlFromHtml(fieldTemp.fieldValue.xml);

        } else if(contentFields[key].fieldTypeIdentifier === 'ezimage') {
          // if no file data (field is empty), catch error:
          // Argument 'Image\Value::$data' is invalid: expected value to be of type 'Existing property' (0)
          if(fieldTemp.fieldValue.fileSize === 0) {
            fieldTemp.fieldValue = null;
          }

        } else if(contentFields[key].fieldTypeIdentifier === 'ezdatetime') {
          if(fieldTemp.fieldValue.internal === '') {
            fieldTemp.fieldValue = null;
          } else {
            // convert the date to an unix timestamp
            fieldTemp.fieldValue.timestamp = Math.round(Date.parse(fieldTemp.fieldValue.internal)/1000)+(60*60*12);
//            fieldTemp.fieldValue.timestamp = Math.round(new Date(fieldTemp.fieldValue.internal).getTime()/1000)+(60*60*12);
            delete fieldTemp.fieldValue.rfc850;
//            fieldTemp.fieldValue.rfc850 = new Date(fieldTemp.fieldValue.internal).toUTCString();
//            delete fieldTemp.fieldValue.timestamp
            delete fieldTemp.fieldValue.internal;
          }
        }

        fieldsProcessed[fieldsProcessed.length] = fieldTemp;
      }
    }

      return fieldsProcessed;
  };


  return contentoperationsService;
}]);
