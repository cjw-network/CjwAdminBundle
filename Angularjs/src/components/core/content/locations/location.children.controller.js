'use strict';

angular.module('ezpAppCore').controller('ezpLocationChildrenCtrl', ['$scope', 'dataFactory', 'messagesFactory', 'cjwWebStorageService', 'settingsService',
  function($scope, dataFactory, messagesFactory, cjwWebStorageService, settingsService) {
    var children = this;
    children.location = [];
    children.hasChildren = false;

    $scope.pathAssets = settingsService.get('appSettings').pathAssets;

    var CacheKey = this.request['_href'].replace(settingsService.get('appSettings').ezpRestApiUrl,'');

    var responseCached = false;
    if(settingsService.get('cacheSettings').locationChildren) {
      responseCached = cjwWebStorageService.get(CacheKey);
    }

    if(responseCached) {
      renderView(responseCached);
    } else {
      dataFactory.request(this.request).then(function(response) {
        renderView(response.LocationList);
        cjwWebStorageService.set(CacheKey,response.LocationList);
      }, function(error) {
        messagesFactory.pushHttpErrorCodeMessage(error.status,'locationGetChildren');
      });
    }

    function renderView(response) {
      if(response.Location.length > 0) {
        children.hasChildren = response.Location.length;
        children.locations = response.Location;
      }
    }

    $scope.getLanguageCodes = function(languageCodes) {
      return languageCodes.split(',');
    };
  }]);
