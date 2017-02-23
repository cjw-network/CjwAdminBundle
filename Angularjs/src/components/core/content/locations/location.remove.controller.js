angular.module('ezpAppCore').controller('ezpLocationRemoveCtrl', ['$scope', '$timeout', 'close', 'modalParams', 'dataFactory', 'messagesFactory',
  function($scope, $timeout, close, modalParams, dataFactory, messagesFactory) {
    $timeout( function() {
      $scope.animate = true;
    }, 50);

    $scope.close = function(result) {
      $scope.animate = false;
      close(result, 450);
    };

    $scope.remove = function() {
      var requestParameters = {
        method: 'DELETE',
        url: modalParams.locationPath
      };

      dataFactory.request(requestParameters).then(function(response) {
        $scope.close(true);
      }, function(error) {
        messagesFactory.pushHttpErrorCodeMessage(error.status,'subtreeRemove');
        $scope.close(false);
      });
    };
  }]);
