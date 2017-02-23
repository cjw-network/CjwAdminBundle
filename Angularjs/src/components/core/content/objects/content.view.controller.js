'use strict';

angular.module('ezpAppCore').controller('ezpContentViewCtrl', ['$filter', '$timeout', 'modalService', 'dataFactory', 'messagesFactory', 'cjwWebStorageService', 'settingsService',
  function($filter, $timeout, modalService, dataFactory, messagesFactory, cjwWebStorageService, settingsService ) {
    var content = this;
    content.currentLanguageCode = this.language;

    // ToDo https://jira.ez.no/browse/EZP-25152
    // https://github.com/ezsystems/ezpublish-kernel/pull/1321
    var request = {
      url: this.request['_href']+'?languages='+this.language,
      mediaType: this.request['_media-type']
    };
    dataFactory.request(request).then(function(response) {
      renderView(response.Content);
      // cache this object for editing in modal dialog
      cjwWebStorageService.set('ezpCurrentContent',response.Content);
    }, function(error) {
      messagesFactory.pushHttpErrorCodeMessage(error.status,'contentLoadById');
    });

    function renderView(responseContent) {
      content.request = { url: responseContent['_href'], mediaType: responseContent['_media-type'] };
      content.id = responseContent['_id'];
      content.remoteId = responseContent['_remoteId'];
      content.name = responseContent.Name;
      content.publishedDate = $filter('date')(responseContent.publishedDate, 'short');
      content.lastModificationDate = $filter('date')(responseContent.lastModificationDate, 'short');
      content.mainLanguageCode = responseContent.mainLanguageCode;
      content.alwaysAvailable = responseContent.alwaysAvailable;
      content.VersionInfo = responseContent.CurrentVersion.Version.VersionInfo;
      content.Fields = responseContent.CurrentVersion.Version.Fields.field;
      content.MainLocationHref = responseContent.MainLocation['_href'];

      content.requestLocations = responseContent.Locations;
      content.requestRelations = responseContent.CurrentVersion.Version.Relations;
      content.requestVersions = responseContent.Versions;

      $timeout( function() {
        getContentProperties(content.requestLocations,'LocationList');
        getContentProperties(content.requestRelations,'Relations');
        getContentProperties(content.requestVersions,'VersionList');
      }, 1000);

      content.updateLanguageVersion = function(languageCode) {
        content.currentLanguageCode = languageCode;
        var request = {
          url: content.request.url+'?languages='+languageCode,
          mediaType: content.request.mediaType
        };
        dataFactory.request(request).then(function(response) {
          renderView(response.Content);
          cjwWebStorageService.set('ezpCurrentContent',response.Content);
        }, function(error) {
          messagesFactory.pushHttpErrorCodeMessage(error.status,'contentLoadById');
        });
      };
    }

    function getContentProperties(req,prop) {
      var CacheKey = req['_href'].replace(settingsService.get('appSettings').ezpRestApiUrl,'');

      var responseCached = false;
      if(settingsService.get('cacheSettings').objectProperties) {
        responseCached = cjwWebStorageService.get(CacheKey);
      }

      if(responseCached) {
        content[prop] = responseCached;
      } else {
        dataFactory.request(req).then(function(response) {
          content[prop] = response[prop];
          cjwWebStorageService.set(CacheKey,response[prop]);
        }, function(error) {
          messagesFactory.pushHttpErrorCodeMessage(error.status,'general');
        });
      }
    };
/*
    content.getContentLocations = function() {
      getContentProperties(content.requestLocations,'LocationList');
    };
*/
    // add location for content
    content.showModalBrowseLocations = function() {
      modalService.showModal({
        templateUrl: 'content/locations/location.browse.modal.html',
        controller: 'ezpLocationBrowseCtrl as location',
        inputs: { modalParams: { multiple: false, action: 'addLocation' } }
      }).then(function(modal) {
        modal.close.then(function(result) {
          if(result) {
            // purge object locations cache item
            cjwWebStorageService.remove(content.requestLocations['_href'].replace(settingsService.get('appSettings').ezpRestApiUrl,''));
            // get new object locations
            getContentProperties(content.requestLocations,'LocationList');
// ToDo: purge new loaction parent children cache
// ToDo: remove last node id in path
//            cjwWebStorageService.remove(result.replace(settingsService.get('appSettings').ezpRestApiUrl,'')+'/children');
          }
        });
      });
    };

    // remove location for content
    content.showModalRemoveLocation = function() {
      if(currentLocationSelections.length > 0) {
        modalService.showModal({
          templateUrl: 'content/locations/location.remove.modal.html',
          controller: 'ezpLocationRemoveCtrl as location',
          inputs: { modalParams: { locationPath: currentLocationSelections[0] } }
        }).then(function(modal) {
          modal.close.then(function(result) {
            if(result) {
              // purge object locations cache item
              cjwWebStorageService.remove(content.requestLocations['_href'].replace(settingsService.get('appSettings').ezpRestApiUrl,''));
              // get new object locations
              getContentProperties(content.requestLocations,'LocationList');
            }
          });
        });
      }
    };

    // ToDo: redundate function, s.a. location.browse.controller.js
    var currentLocationSelections = [];
    content.setLocationSelection = function(index) {
      var locationSelected = content.LocationList.Location[index].selected;
      var locationHref = content.LocationList.Location[index]['_href'];

      if(!content.multiple) {    // only if single selection, reset selected
        for(var idx in content.LocationList.Location) {
          content.LocationList.Location[idx].selected = false;
        }
        currentLocationSelections.length = 0;
      }

      if(locationSelected) {
        currentLocationSelections[currentLocationSelections.length] = locationHref;
        if(!content.multiple) {
          content.LocationList.Location[index].selected = locationSelected;   // only needed if single select
        }
      } else {
        if(content.multiple) {   // only if multiple selections
          var index = currentLocationSelections.indexOf(locationHref);
          if(index > -1) {
            currentLocationSelections.splice(index,1);
          }
        }
      }
    };

    content.locationRemove = function() {
      var locationPath = currentLocationSelections[0];

      var requestParameters = {
        method: 'DELETE',
        url: locationPath
      };

      dataFactory.request(requestParameters).then(function(response) {
        getContentProperties(content.requestLocations,'LocationList');
      }, function(error) {
        messagesFactory.pushHttpErrorCodeMessage(error.status,'subtreeRemove');
      });
    };

    content.locationSetMain = function() {
      
    };
}]);
