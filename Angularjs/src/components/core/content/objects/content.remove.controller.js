'use strict';

// http://dwmkerr.github.io/angular-modal-service/
// http://www.dwmkerr.com/the-only-angularjs-modal-service-youll-ever-need/

angular.module('ezpAppCore').controller('ezpContentRemoveCtrl', ['$scope', '$timeout', 'close', 'modalParams', 'dataFactory', 'messagesFactory', 'cjwWebStorageService',
  function($scope, $timeout, close, modalParams, dataFactory, messagesFactory, cjwWebStorageService) {
    var content = this;

    var response = cjwWebStorageService.get('ezpCurrentContent');

    content.id = response['_id'];

    $timeout( function() {
      $scope.animate = true;
    }, 50);

    $scope.close = function(result) {
      $scope.animate = false;
      close(result, 450);
    };

    $scope.remove = function() {
      var removeContentParams = {
        method: 'DELETE',
        url: '/content/objects/'+content.id
      };

      // remove the content object
      dataFactory.request(removeContentParams,true).then(function(removeContentResponse) {
          // purge location cache for parent parent location children
          // ToDo: if content object has more then one location
          cjwWebStorageService.remove(modalParams.parentLocationCacheKey+'/children');
          $scope.close(true);
      }, function(error) {
        messagesFactory.pushHttpErrorCodeMessage(error.status,'contentRemove');
        $scope.close(false);
      });
    };
  }]);
