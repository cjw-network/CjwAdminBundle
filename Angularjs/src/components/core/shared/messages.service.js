'use strict';

angular.module('ezpAppCore').factory('messagesFactory', ['cjwWebStorageService', function(cjwWebStorageService) {
  var messagesFactory = {};

  var httpErrorCodes = {
    general: {
      500: 'The server encountered an unexpected condition which prevented it from fulfilling the request - e.g. database down etc.',
      501: 'The requested method was not implemented yet',
      401: 'The user is not authorized',
      404: 'Requested resource was not found',
      405: 'The request method is not available',
      406: 'The request contains an Accept header which is not supported. An href in the request doesn\'t match an API resource (prefix missing ?)',
      413: 'Request Entity Too Large'
    },
    contentLoadById: {
      401: 'The user is not authorized to read this object. This could also happen if there is no published version yet and another user owns a draft of this content',
      404: 'The content with this ID is not found'
    },
    contentCreateDraft: {
      400: 'The Input does not match the input schema definition or the validation on a field fails',
      401: 'The user is not authorized to create this object in this location',
      404: 'The parent location is specified in the request body and it does not exist'
    },
    contentCreateDraftFromCurrentVersion: {
      401: 'The user is not authorized to update this object',
      403: 'The current version is already a draft',
      404: 'The content object was not found'
    },
    contentUpdateVersion: {
      400: 'The Input does not match the input schema definition, In this case the response contains an ErrorMessage',
      401: 'The user is not authorized to update this version',
      403: 'The version is not allowed to change - i.e is not a DRAFT',
      404: 'The content id or version id does not exist',
      412: 'The current ETag does not match with the provided one in the If-Match header'
    },
    contentPublishVersion: {
      401: 'The user is not authorized to publish this version',
      403: 'The version is not a draft',
      404: 'The content object or version nr was not found'
    },
    contentRemove: {
      401: 'The user is not authorized to delete this object',
      404: 'The content object was not found'
    },

    getContentType: {
      401: 'The user is not authorized to read this content type',
      404: 'The content type does not exist'
    },

    locationLoadByPath: {
      401: 'The user is not authorized to read this location',
      404: 'The location with the given path does not exist'
    },
    locationGetChildren: {
      401: 'The user is not authorized to read this location',
      404: 'The location with the given path does not exist'
    },
    locationCreate: {
      400: 'The Input does not match the input schema definition',
      401: 'The user is not authorized to create this location',
      403: 'The location under the given parent id already exists'
    },

    subtreeMove: {
      401: 'The user is not authorized to move this location',
      404: 'The location with the given id does not exist'
    },
    subtreeRemove: {
      401: 'The user is not authorized to delete this subtree',
      404: 'The location with the given id does not exist'
    },

    roleList: {
      401: 'The user has no permission to read roles'
    }
  };

  messagesFactory.pushHttpErrorCodeMessage = function(httpCode,restMethod) {
    var message = httpCode + ' : not specified';
// ToDo: is defined etc.
    if(httpErrorCodes[restMethod].hasOwnProperty(httpCode)) {
      message = httpCode + ' : ' + httpErrorCodes[restMethod][httpCode];
    } else {
      message = httpCode + ' : ' + httpErrorCodes.general[httpCode];
    }
    cjwWebStorageService.set('appHasMessage',{"msg":message},false,true);
  };

  return messagesFactory;
}]);
