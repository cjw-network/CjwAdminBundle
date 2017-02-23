'use strict';

// http://odetocode.com/blogs/scott/archive/2013/07/03/building-a-filereader-service-for-angularjs-the-service.aspx

angular.module('ezpAppCore').factory('cjwFileReaderService', ['$q', function($q) {
  var onLoad = function(reader, deferred, scope) {
    return function () {
      scope.$apply(function () {
        deferred.resolve(reader.result);
      });
    };
  };

  var onError = function (reader, deferred, scope) {
    return function () {
      scope.$apply(function () {
        deferred.reject(reader.result);
      });
    };
  };

  var onProgress = function(reader, scope) {
    return function (event) {
      scope.$broadcast("fileProgress", { total: event.total, loaded: event.loaded });
    };
  };

  var getReader = function(deferred, scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    reader.onprogress = onProgress(reader, scope);
    return reader;
  };

  var readAsDataURL = function (file, scope) {
    var deferred = $q.defer();

    var reader = getReader(deferred, scope);
    reader.readAsDataURL(file);

    return deferred.promise;
  };
/*
  // todo: async / $q, todo: prüfen ob image, nur anwenden wenn bild grösser, und höhe mit einbeziehen
  // http://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
  // http://stackoverflow.com/questions/19262141/resize-image-with-javascript-canvas-smoothly
  // http://stackoverflow.com/questions/18922880/html5-canvas-resize-downscale-image-high-quality/19235791#19235791
  var imgResize = function(maxWidth, quality, imgSrc, callback) {
    var tmpImg = new Image();
    tmpImg.src = imgSrc;

    tmpImg.onload = function() {
      var canvas   = document.createElement('canvas');
      var context  = canvas.getContext('2d');
      canvas.width = maxWidth;

      /// set size proportional to image
      canvas.height = canvas.width * (tmpImg.height / tmpImg.width);

      /// step 1 - resize to 50%
      var oc   = document.createElement('canvas');
      var octx = oc.getContext('2d');

      oc.width  = tmpImg.width * 0.5;
      oc.height = tmpImg.height * 0.5;
      octx.drawImage(tmpImg, 0, 0, oc.width, oc.height);

      /// step 2 - resize 50% of step 1
      octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);

      /// step 3, resize to final size
      context.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5, 0, 0, canvas.width, canvas.height);

      var result = canvas.toDataURL('image/jpeg', quality); // default browser jpeg quali=0.92 ?

      oc.remove();
      canvas.remove();

      callback(result);
    };
  };
*/
  return {
    readAsDataUrl: readAsDataURL
//    ,imgResize: imgResize
  };
}]);
/*
Easiest is to find the needed scale for each dimension,
select the min value and then multiply that to all dimensions, ie (pseudo code):
scale = min(max_height/height, max_width/width)
if scale<1
height *= scale
width *= scale
----
For resizing in both directions with slightly less code. (Assume inputs have been validated):
if(old.height/old.width – pref.height/pref.width > 0){
new.width = pref.height/old.height * old.width;
new.height = pref.height;
}else{
new.height = pref.width/old.width * old.height;
new.width = pref.width;
}
*/
/*
var UploadController = function ($scope, fileReader) {
  $scope.getFile = function () {
    $scope.progress = 0;
    fileReader.readAsDataUrl($scope.file, $scope).then(function(result) {
      $scope.imageSrc = result;
    });
  };

  $scope.$on("fileProgress", function(e, progress) {
    $scope.progress = progress.loaded / progress.total;
  });
};
*/