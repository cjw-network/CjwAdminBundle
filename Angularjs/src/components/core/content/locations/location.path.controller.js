angular.module('ezpAppCore').controller('ezpLocationPathCtrl', ['$timeout', '$interval', 'cjwWebStorageService', 'settingsService', 'dataFactory', 'messagesFactory',
  function($timeout, $interval, cjwWebStorageService, settingsService, dataFactory, messagesFactory) {
    var path = this;

    var pathArray = this.pathstring.substring(1, this.pathstring.length-1).split('/');

    var cacheKey = '/content/locations';
    var responseCached = false;
    var counter = 1;
    var parameters;

    $timeout( function() {
//      path.items = {};
      var pathItems = {};

      for(var key in pathArray) {
        cacheKey = cacheKey+'/'+pathArray[key];

        if(key>0) { // skip first node (1 = ez root node)
          getPathItem(cacheKey,function(item) {
            counter++;

            if(item) {
//console.log(item);
              pathItems[item['_href']] = { path:item['_href'], name:item['name'] };
            }
          });
        }
      }

      var promise = $interval(function() {
//console.log(counter+' x '+pathArray.length);
        if(counter === pathArray.length) {
//console.log(pathItems);
          path.items = pathItems;
          $interval.cancel(promise);
        }
      }, 250, 10);
    }, 10);

    function getPathItem(cacheKey,callback) {
      responseCached = false;

      if(settingsService.get('cacheSettings').locations) {
        responseCached = cjwWebStorageService.get(cacheKey);
      }

      if(responseCached) {
        callback(responseCached);
      } else {
        parameters = { url: cacheKey, mediaType: 'application/vnd.ez.api.Location' };
        dataFactory.request(parameters,true).then(function(response) {
          cjwWebStorageService.set(cacheKey,response.Location);
          callback(response.Location);
        }, function(error) {
          messagesFactory.pushHttpErrorCodeMessage(error.status,'locationLoadByPath');
          callback(false);
        });
      }
    }
}]);
