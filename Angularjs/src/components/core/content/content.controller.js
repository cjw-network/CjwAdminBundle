'use strict';

angular.module('ezpAppCore').controller('ezpContentCtrl', ['$scope', '$routeParams', '$route', '$filter', '$location', 'i18nContentService', 'settingsService', 'modalService', 'dataFactory', 'messagesFactory', 'cjwWebStorageService', 'accessFactory',
  function($scope, $routeParams, $route, $filter, $location, i18nContentService, settingsService, modalService, dataFactory, messagesFactory, cjwWebStorageService, accessFactory) {
    // set the sidebar menu
    cjwWebStorageService.set('appHasSidebar',{"status":"content"},false,true);

    var content = this;
    content.location = {};
//    content.hasParent = false;

    // dynamic routing
    var rootLocationHref = cjwWebStorageService.get('ezpRoot').rootLocation['_href'];
    var locationId;
    if ($routeParams.locationId) {
      locationId = $routeParams.locationId;
    } else {
      locationId = rootLocationHref.split('/locations/')[1].replace(/\//g,'-');
    }

    var parameters = {
      url: '/content/locations/'+locationId.replace(/-/g,'/'),
      mediaType: 'application/vnd.ez.api.Location'
    };

    var CacheKey = parameters.url;

    var responseCached = false;
    if(settingsService.get('cacheSettings').locations) {
      responseCached = cjwWebStorageService.get(CacheKey);
    }

    if(responseCached) {
      renderView(responseCached);
    } else {
      dataFactory.request(parameters,true).then(function(response) {
        renderView(response.Location);
        cjwWebStorageService.set(CacheKey,response.Location);
      }, function(error) {
        messagesFactory.pushHttpErrorCodeMessage(error.status,'locationLoadByPath');
      });
    }

    function renderView(response) {
      // set current location for later (re)use
      cjwWebStorageService.set('ezpCurrentLocation',response);

      content.location = response;

      var parentLocationHref = response.ParentLocation['_href'];
      var ezpRoot = cjwWebStorageService.get('ezpRoot');
      var rootMediaFolderHref = ezpRoot.rootMediaFolder['_href'];
//      var rootUserFolderHref = ezpRoot.rootUserFolder['_href'];
// ToDo: get from setup
      var rootUserFolderHref = 'todo';

      if(parentLocationHref.indexOf(rootLocationHref) > -1
          || parentLocationHref.indexOf(rootMediaFolderHref) > -1
          || parentLocationHref.indexOf(rootUserFolderHref) > -1)
      {
        content.parentLocation = response.ParentLocation['_href'];
      }

      var parentLocationCacheKey = parentLocationHref.split(settingsService.get('appSettings').ezpRestApiUrl)[1];

      content.canContentCreate = false;
      if(cjwWebStorageService.get('ezpCurrentContent').ContentType) {
        var canCreateParameters = {
          isContainer: response.canCreate,
          pathString: response.pathString,
          parentContentType: cjwWebStorageService.get('ezpCurrentContent').ContentType['_href'].split('/')[6]
        };
        content.canContentCreate = accessFactory.canContentCreate(canCreateParameters);
      }
      content.selectedContentCreateContentType = 0;

      content.canContentEdit = response.canEdit;

      var canRemoveParameters = {
        canRemove: response.canRemove,
        pathString: response.pathString
      };
      content.canContentRemove = accessFactory.canContentRemove(canRemoveParameters);

      var canMoveParameters = {
        canMove: response.canMove,
        pathString: response.pathString
      };
      content.canContentMove = accessFactory.canContentMove(canMoveParameters);

      $scope.showModalEdit = function() {
        modalService.showModal({
          templateUrl: 'content/objects/content.edit.modal.html',
          controller: 'ezpContentEditCtrl as content',
          inputs: { modalParams: { parentLocationCacheKey: parentLocationCacheKey } }
        }).then(function(modal) {
          modal.close.then(function(result) {
            if(result) {
              // rendering changed content in content view controller
              $route.reload();
            }
          });
        });
      };

      $scope.showModalCreate = function() {
        modalService.showModal({
          templateUrl: 'content/objects/content.create.modal.html',
          controller: 'ezpContentCreateCtrl as content',
          inputs: { modalParams: { pathStr: response.pathString.slice(0, -1), contentType: content.selectedContentCreateContentType } }
        }).then(function(modal) {
          modal.close.then(function(result) {
            if(result) {
              $location.path($filter('getapproute')(result));
            }
          });
        });
      };

      $scope.showModalMove = function() {
        modalService.showModal({
          templateUrl: 'content/locations/location.browse.modal.html',
          controller: 'ezpLocationBrowseCtrl as location',
          inputs: { modalParams: { multiple: false, action: 'moveSubtree' } }
        }).then(function(modal) {
          modal.close.then(function(result) {
            if(result) {
              // ToDo: redirect to new location
            }
          });
        });
      };

      $scope.showModalRemove = function() {
        modalService.showModal({
          templateUrl: 'content/objects/content.remove.modal.html',
          controller: 'ezpContentRemoveCtrl as content',
          inputs: { modalParams: { parentLocationCacheKey: parentLocationCacheKey } }
        }).then(function(modal) {
          modal.close.then(function(result) {
            if(result) {
              $location.path($filter('getapproute')(parentLocationHref));
            }
          });
        });
      };
    }
}]);
