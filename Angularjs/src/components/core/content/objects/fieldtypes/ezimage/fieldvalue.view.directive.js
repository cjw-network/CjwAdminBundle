'use strict';

angular.module('ezpAppCore').directive('ezpFieldvalueViewEzimage', [function() {
  return {
    scope: false,
    restrict: 'E',
    template: '<div style="width: 30%;float: left;">' +
                  '<p ng-bind="::field.fieldValue.fileName"></p>' +
                  '<p ng-bind="::field.fieldValue.alternativeText"></p>' +
              '</div>' +
              '<img style="max-height: 240px; max-width: 65%;" ng-if="imgVarUri" ng-src="{{imgVarUri}}" />' +
              '<div class="break"></div>',

    controller: ['$scope', '$timeout', 'settingsService', 'dataFactory', function($scope, $timeout, settingsService, dataFactory) {
      var defaultImageVariation = settingsService.get('appSettings').defaultImageVariation || false;
      $scope.imgVarUri = false;

      // check for existing image variation or trigger creation
      $timeout(function() {
        var fieldValue = $scope.field.fieldValue;
        if(fieldValue) {
          for(var variation in fieldValue.variations) {
            if(variation === defaultImageVariation) {
              dataFactory.request({url:fieldValue.variations[variation]['href']}).then(function(response) {
                $scope.imgVarUri = response.ContentImageVariation.uri;
              }, function(error) {
                $scope.imgVarUri = fieldValue.uri;
              });
            }
          }
        }
      }, 0);
    }]
  };
}]);
