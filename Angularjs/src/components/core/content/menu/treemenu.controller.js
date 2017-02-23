angular.module('ezpAppCore').controller('ezpTreemenuCtrl', ['$scope', '$timeout', 'dataFactory', 'messagesFactory', 'cjwWebStorageService', 'settingsService',
  function($scope, $timeout, dataFactory, messagesFactory, cjwWebStorageService, settingsService) {
    var tree = this;
    var ezpRestApiUrl = settingsService.get('appSettings').ezpRestApiUrl;

    // ToDo: defaults to internal app settings
    var request = { '_media-type': 'application\/vnd.ez.api.LocationList+json',
                    '_href': ezpRestApiUrl + '/content/locations/1/2/children' };

    request['_href'] = ezpRestApiUrl + '/content/locations/' + cjwWebStorageService.get('appCurNaviPart').href.split('/location/')[1].split('-').join('/') + '/children';

    treeInit(request);

    $scope.$on('appCurNaviPart', function(event,args) {
      var appCurNaviPartHref = args.href;
      if(appCurNaviPartHref.indexOf('/location/') > -1) {    // ToDo: nur in content modul ausführen
        request['_href'] = ezpRestApiUrl + '/content/locations/' + appCurNaviPartHref.split('/location/')[1].split('-').join('/') + '/children';
        treeInit(request);
      }
    });

    function treeInit(request) {
      tree.rootNode = {
        name: false,  // ez content root
        request: request,
        href: request['_href'].replace('/children',''),
        active: false,
        depth: 1,
        count: 1,
        children: [{}]
      };

      tree.setNode = function(parent,idx,request) {
        if(parent.children[idx].active) {
          parent.children[idx].active = false;
          parent.children[idx].children = [];
        } else {
          parent.children[idx].active = true;
          requestNode(request, function(children) {
            parent.children[idx].children = children;
          });
        }
      };

      $timeout( function() {
        tree.setNode(tree.rootNode,0,tree.rootNode.request);
      }, 10);
    }

    function requestNode(request,callback) {
      var CacheKey = request['_href'].replace(settingsService.get('appSettings').ezpRestApiUrl,'');

      var responseCached = false;
      if(settingsService.get('cacheSettings').locationChildren) {
        responseCached = cjwWebStorageService.get(CacheKey);
      }

      if(responseCached) {
//        return renderNode(responseCached);
        callback(renderNode(responseCached));
      } else {
        dataFactory.request(request).then(function(response) {
          cjwWebStorageService.set(CacheKey,response.LocationList);
//          return renderNode(response.LocationList);
          callback(renderNode(response.LocationList));
        }, function(error) {
          messagesFactory.pushHttpErrorCodeMessage(error.status,'locationGetChildren');
        });
      }
    }

    function renderNode(response) {
      var children = [];
      var request, href;
// is container, allowed type, settings, etc
      if(response.Location.length > 0) {
        for(var idx in response.Location) {
//          pathString = response.Location[idx]['_href'].split('/locations/1/')[1].split('/children')[0];
          href = response.Location[idx]['_href'],
          request = { '_href': response.Location[idx]['_href']+'/children',
                      '_media-type': response.Location[idx]['_media-type'].replace('Location','LocationList') };

          children[children.length] = {
            name: response.Location[idx].name,
// contentType, hidden, invisible, section?
            request: request,
            href: href,
            active: false,
            depth: href.split('/locations/')[1].split('/').length,
            count: response.Location[idx].childCount,
            children: []
          };
        }
      }

      return children;
    }
  }]);
