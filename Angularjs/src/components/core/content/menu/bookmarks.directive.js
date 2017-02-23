angular.module('ezpAppCore').directive('cjwBookmarks', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {},

    template:
'<div class="cjw-Bookmarks">' +
    '<button ng-if="bookmarks.canBookmark" style="width: 95%;margin-bottom: 0.5rem;" ng-click="::bookmarks.addBookmark()">' +
        '{{\'Add Bookmark\'|i18n:\'content\'}}' +
    '</button>' +
    '<ul>' +
        '<li ng-repeat="(key,bookmark) in bookmarks.hasBookmarks">' +
            '<span class="pointer fa fa-times" ng-click="::bookmarks.removeBookmark(key)"></span>' +
            '<a ng-href="{{key}}">{{bookmark}}</a>' +
        '</li>' +
    '</ul>' +
'</div>',

    controllerAs: 'bookmarks',
    controller: ['$location', 'cjwWebStorageService', function($location, cjwWebStorageService) {
      var bookmarks = this;

      bookmarks.hasBookmarks = cjwWebStorageService.get('bookmarks') || {};
      bookmarks.canBookmark = true;

      bookmarks.addBookmark = function() {
// ToDo: this will only work if settingsObj.cacheSettingslocations: true
        var name = cjwWebStorageService.get('ezpCurrentLocation').name;

        bookmarks.hasBookmarks[$location.path()] = name;
        cjwWebStorageService.set('bookmarks', bookmarks.hasBookmarks, true);
      };

      bookmarks.removeBookmark = function(key) {
        delete bookmarks.hasBookmarks[key];
        cjwWebStorageService.set('bookmarks', bookmarks.hasBookmarks, true);
      };
    }]
  };
});
