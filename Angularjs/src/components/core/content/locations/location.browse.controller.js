'use strict';

angular.module('ezpAppCore').controller('ezpLocationBrowseCtrl', ['$scope', '$timeout', 'close', 'modalParams', 'dataFactory', 'messagesFactory', 'cjwWebStorageService', 'settingsService',
  function($scope, $timeout, close, modalParams, dataFactory, messagesFactory, cjwWebStorageService, settingsService) {
    var location = this;
    location.action = modalParams.action;
    location.multiple = modalParams.multiple;
    location.select = {};
// ToDo: was ist mit ezpCurrent... in mehreren browser tabs?
    var ezpCurrentLocation = cjwWebStorageService.get('ezpCurrentLocation');
    var parentChildrenLocation = { '_href': ezpCurrentLocation.ParentLocation['_href']+'/children',
      '_media-type': ezpCurrentLocation.ParentLocation['_media-type'].replace('Location','LocationList') };

    requestData(parentChildrenLocation);

    location.pathAssets = settingsService.get('appSettings').pathAssets;

    location.requestLink = function(request) {
      if(request) {
        requestData(request);
      }
    };

    location.getLanguageCodes = function(languageCodes) {
      return languageCodes.split(',');
    };

    function requestData(request) {
      var CacheKey = request['_href'].replace(settingsService.get('appSettings').ezpRestApiUrl,'');

      var responseCached = false;
      if(settingsService.get('cacheSettings').locationChildren) {
        responseCached = cjwWebStorageService.get(CacheKey);
      }

      if(responseCached) {
        renderView(responseCached);
      } else {
        dataFactory.request(request,false).then(function(response) {
          renderView(response.LocationList);
          cjwWebStorageService.set(CacheKey,response.LocationList);
        }, function(error) {
          messagesFactory.pushHttpErrorCodeMessage(error.status,'locationGetChildren');
        });
      }
    }

    function renderView(response) {
      location.hasChildren = response.Location.length;
      location.children = response.Location;

      var tmp = response['_href'].split('/');
      var test = tmp.splice(-2,1);

      location.parent = { '_href': tmp.join('/'), '_media-type': response['_media-type'] };
      if(test[0] === '1') {
        location.parent = false;
      }
    }

    $timeout( function() {
      $scope.animate = true;
    }, 50);

    $scope.close = function(result) {
      $scope.animate = false;
      close(result, 450);
    };

    // ToDo: redundate function, s.a. content.view.controller.js
    var currentLocationSelections = [];
    location.setLocationSelection = function(index) {
      var locationSelected = location.children[index].selected;
      var locationHref = location.children[index]['_href'];

      if(!location.multiple) {    // only if single selection, reset selected
        for(var idx in location.children) {
          location.children[idx].selected = false;
        }
        currentLocationSelections.length = 0;
      }

      if(locationSelected) {
        currentLocationSelections[currentLocationSelections.length] = locationHref;
        if(!location.multiple) {
          location.children[index].selected = locationSelected;   // only needed if single select
        }
      } else {
        if(location.multiple) {   // only if multiple selections
          var index = currentLocationSelections.indexOf(locationHref);
          if(index > -1) {
            currentLocationSelections.splice(index,1);
          }
        }
      }
    };

    location.select.addLocation = function() {
// ToDo: move this out here!
      var locationPath = currentLocationSelections[0];

      if(locationPath) {
        var ezpCurrentContent = cjwWebStorageService.get('ezpCurrentContent');

        var postBodyData = angular.toJson({
          LocationCreate: {
            ParentLocation: { '_href': locationPath },
            priority: '0',
            hidden: 'false',
            sortField: 'PATH',
            sortOrder: 'ASC'
          }
        });

        var addLocationRequestParams = {
          method: 'POST',
          url: '/content/objects/'+ezpCurrentContent['_id']+'/locations',
          mediaType: 'application/vnd.ez.api.Location',
          contentType: 'application/vnd.ez.api.LocationCreate',
          data: postBodyData
        };

        dataFactory.request(addLocationRequestParams,true).then(function(addLocationResponse) {
          $scope.close(locationPath);
        }, function(error) {
          messagesFactory.pushHttpErrorCodeMessage(error.status,'locationCreate');
          $scope.close(false);
        });
      }
    };

    location.select.moveSubtree = function() {
// ToDo: move this out here!
      var locationPath = currentLocationSelections[0];

      if(locationPath) {
// ToDo: source not removed?
        var moveSubtreeRequestParams = {
          method: 'MOVE',
          url: ezpCurrentLocation['_href'],
          headers: { Destination: locationPath }
        };

        dataFactory.request(moveSubtreeRequestParams,false).then(function(moveSubtreeResponse) {
// ToDo: reload current object locations
          cjwWebStorageService.remove('/content/locations'+ezpCurrentLocation['_href'].split('/content/locations')[1]+'/children');
          cjwWebStorageService.remove('/content/locations'+locationPath.split('/content/locations')[1]+'/children');
          $scope.close(true);
        }, function(error) {
          messagesFactory.pushHttpErrorCodeMessage(error.status,'subtreeMove');
          $scope.close(false);
        });
      }
    };
  }]);
