'use strict';

// http://dwmkerr.github.io/angular-modal-service/
// http://www.dwmkerr.com/the-only-angularjs-modal-service-youll-ever-need/

angular.module('ezpAppCore').controller('ezpContenttypeCreateCtrl', ['$scope', '$timeout', 'close', 'modalParams', 'dataFactory', 'messagesFactory', 'cjwWebStorageService',
  function($scope, $timeout, close, modalParams, dataFactory, messagesFactory, cjwWebStorageService) {
    var contenttype = this;

    $timeout( function() {
      $scope.animate = true;
    }, 50);

    $scope.close = function(result) {
      $scope.animate = false;
      close(result, 450);
    };

    $scope.publish = function() {
      var createDraftParams = {
        method: 'COPY',
        url: '/content/objects/'+content.id+'/currentversion',
        mediaType: 'application/vnd.ez.api.Version'
      };
    };
  }]);
