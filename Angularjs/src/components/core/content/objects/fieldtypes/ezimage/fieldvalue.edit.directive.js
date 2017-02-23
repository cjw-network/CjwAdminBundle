'use strict';

angular.module('ezpAppCore').directive('ezpFieldvalueEditEzimage', [function() {
  return {
    scope: false,
    restrict: 'E',
    template: '<table><tr>' +
                  '<td><img ng-if="imgSrc" ng-src="{{imgSrc}}" style="max-height: 320px; max-width: 70%;" /></td>' +
                  '<td>' +
                      '<p><input class="box" ng-model="field.fieldValue.alternativeText" placeholder="alternative text" /></p>' +
                      '<p ng-if="field.fieldValue.fileName" ng-bind="field.fieldValue.fileName"></p>' +
                      '<p ng-if="field.fieldValue.fileSize" ng-bind="field.fieldValue.fileSize"></p>' +
                      '<!--p ng-if="field.fieldValue.width" ng-bind="field.fieldValue.width"></p>' +
                      '<p ng-if="field.fieldValue.height" ng-bind="field.fieldValue.height"></p-->' +
                  '</td>' +
              '</tr><tr>' +
                  '<td colspan="2"><div class="box" cjw-file-reader-input="file"></div></td>' +
              '</tr></table>',
/*
<!--div>Select an image file: <input type="file" id="fileInput" /></div>\n\
<div class="cropArea">\n\
  <img-crop image="myImage" result-image="myCroppedImage"></img-crop>\n\
</div>\n\
<div>Cropped Image:</div>\n\
<div><img ng-src="{{myCroppedImage}}" /></div-->\n\
',
*/
    controller: ['$scope', 'cjwFileReaderService', function($scope, cjwFileReaderService) {
      if($scope.field.fieldValue !== null) {
        $scope.imgSrc = $scope.field.fieldValue.uri;
        // Argument 'localFile' is invalid: file does not exist or is unreadable: media/bilder/... (0)
        // /ezpvendor/ezsystems/ezpublish-kernel/eZ/Publish/Core/FieldType/Image/ImageStorage.php
        // in line 148 und 152 wird $localFilePath micht mit dem richtigem prefix aufgerufen
        // ausgehend von web fehlt 'var/app/storage/images/' dann gehts richtig weiter
        // dies is nur der fall wenn das bild mit der id erzeugt wird (depracated)
        $scope.field.fieldValue.inputUri = $scope.field.fieldValue.uri.slice(1);
        // Argument 'Image\Value::$variations' is invalid: expected value to be of type 'Existing property', got 'array' (0)
        delete $scope.field.fieldValue.variations;
      } else {  // when newly created (modell)
        $scope.imgSrc = false;
        $scope.field.fieldValue = {
          alternativeText: '',
          fileName: '',
          fileSize: 0,
          data: null
        };
      }

      $scope.readFile = function() {
//        $scope.progress = 0;
        cjwFileReaderService.readAsDataUrl($scope.file, $scope).then(function(result) {
          $scope.imgSrc = result;
          $scope.field.fieldValue.data = result.split(',')[1];
          $scope.field.fieldValue.fileSize = $scope.file.size;
          $scope.field.fieldValue.fileName = $scope.file.name;
// test crop
//$scope.$apply(function($scope){
//  $scope.myImage = result;
//});
          if($scope.field.fieldValue.uri) { // wenn ein bestehendes image ausgetauscht wird:
            delete $scope.field.fieldValue.id;
            delete $scope.field.fieldValue.path;
            delete $scope.field.fieldValue.imageId;
            delete $scope.field.fieldValue.uri;
            delete $scope.field.fieldValue.inputUri;
            delete $scope.field.fieldValue.width;
            delete $scope.field.fieldValue.height;
          }
/*
        jacFileReaderService.imgResize(480, 0.75, result, callback);  // todo: prüfen ob image
        function callback(imgResized) {
            $scope.nickImageSrc = imgResized;
            settingsService.setConfig('personality',{'nickImage':imgResized});
            socketService.sendQueued({t:'pImg',d:imgResized});
        };
*/
        });
      };
/*
// image crop test
$scope.myImage = '';
$scope.myCroppedImage='';

var handleFileSelect=function(evt) {
  var file=evt.currentTarget.files[0];
  var reader = new FileReader();
  reader.onload = function (evt) {
    $scope.$apply(function($scope){
      $scope.myImage=evt.target.result;
    });
  };
  reader.readAsDataURL(file);
};
angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

//
*/
    }]
  };
}]);

// ToDo: check max allowed image size

/* http://stackoverflow.com/questions/2311887/how-to-determine-presence-of-html5-dragndrop-file-upload-api-like-the-one-fro
var supportsDragAndDrop = function() {
    var div = document.createElement('div');
    return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
}
*/