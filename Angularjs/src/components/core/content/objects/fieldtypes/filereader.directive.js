'use strict';

// http://odetocode.com/blogs/scott/archive/2013/07/05/a-file-input-directive-for-angularjs.aspx
// ToDo: input styling http://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/

angular.module('ezpAppCore').directive('cjwFileReaderInput', ['$parse', function($parse) {
  return {
    restrict: 'A',
    template: '<input class="p" type="file" on-change="readFile()" />',
    replace: true,
    link: function (scope, element, attrs) {
      var modelGet = $parse(attrs.cjwFileReaderInput);
      var modelSet = modelGet.assign;
      var onChange = $parse(attrs.onChange);

      var updateModel = function () {
        scope.$apply(function () {
          modelSet(scope, element[0].files[0]);
          onChange(scope);
        });
      };

      element.bind('change', updateModel);
    }
  };
}]);
