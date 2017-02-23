angular.module('ezpAppCore').directive('ezpMessages', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: false,

    template:
'<p id="messages" class="pointer" ng-if="messages.appHasMessage" ng-click="messages.close()" ng-bind="messages.appHasMessage"></p>',

    controllerAs: 'messages',
    controller: ['$scope', '$timeout', function($scope, $timeout) {
      var messages = this;

      messages.close = function() {
        messages.appHasMessage = false;
      };

      $scope.$on('appHasMessage', function(event,args) {
        messages.appHasMessage = args.msg;
        $timeout( function() {
          messages.appHasMessage = false;
        }, 10000);
      });
    }]
  };
});
