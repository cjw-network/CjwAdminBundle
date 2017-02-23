angular.module('ezpAppCore').directive('ezpContenttypeGroups', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    templateUrl: 'contenttypes/groups/groupsmenubox.html',
    controllerAs: 'contenttypeGroups',
    controller: ['messagesFactory', 'dataFactory', 'settingsService', 'cjwWebStorageService', function(messagesFactory, dataFactory, settingsService, cjwWebStorageService) {
      var contenttypeGroups = this;
      contenttypeGroups.groupList = false;
      contenttypeGroups.pathPrefix = settingsService.get('appSettings').pathPrefix;
      contenttypeGroups.newGroupIdentifier = '';

      var request = {
        '_media-type': 'application\/vnd.ez.api.ContentTypeGroupList+json',
        '_href': settingsService.get('appSettings').ezpRestApiUrl + '/content/typegroups'
      };

      var CacheKey = request['_href'].replace(settingsService.get('appSettings').ezpRestApiUrl,'');

      getContentTypeGroups();

      function getContentTypeGroups() {
        var responseCached = cjwWebStorageService.get(CacheKey);

        if(responseCached) {
          contenttypeGroups.groupList = responseCached;
        } else {
          dataFactory.request(request).then(function(response) {
            var ezpContenttypeGroupList = {};   // used for caching
            var contentTypeGroupList = response.ContentTypeGroupList.ContentTypeGroup;
//            cjwWebStorageService.set(CacheKey,response.LocationList);
            for(var idx in contentTypeGroupList) {
              ezpContenttypeGroupList[contentTypeGroupList[idx].id] = contentTypeGroupList[idx];
            }
            contenttypeGroups.groupList = ezpContenttypeGroupList;
            // cache the result for later use (group name filter)
            cjwWebStorageService.set(CacheKey,ezpContenttypeGroupList);
          }, function(error) {
            messagesFactory.pushHttpErrorCodeMessage(error.status,'general');
          });
        }
      };

      contenttypeGroups.createGroup = function() {
        if(contenttypeGroups.newGroupIdentifier !== '') {
          var postBodyData = angular.toJson({
            ContentTypeGroupInput: {
              identifier: contenttypeGroups.newGroupIdentifier
            }
          });

          var request = {
            method: 'POST',
            url: '/content/typegroups',
            mediaType: 'application/vnd.ez.api.ContentTypeGroup',
            contentType: 'application/vnd.ez.api.ContentTypeGroupInput',
            data: postBodyData
          };

          dataFactory.request(request,true).then(function(response) {
            cjwWebStorageService.remove(CacheKey);
            contenttypeGroups.newGroupIdentifier = '';
            getContentTypeGroups();
          }, function(error) {
            messagesFactory.pushHttpErrorCodeMessage(error.status,'general');
          });
        }
      };

      contenttypeGroups.removeGroup = function(groupId) {
        var request = {
          method: 'DELETE',
          url: '/content/typegroups/' + groupId
        };

        dataFactory.request(request,true).then(function(response) {
          cjwWebStorageService.remove(CacheKey);
          contenttypeGroups.newGroupIdentifier = '';
          getContentTypeGroups();
        }, function(error) {
          messagesFactory.pushHttpErrorCodeMessage(error.status,'general');
        });
      };

      contenttypeGroups.editGroup = function(key) {
        //
      };
    }]
  };
});
