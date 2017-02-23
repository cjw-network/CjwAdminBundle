'use strict';

angular.module('ezpAppCore').factory('ezxmlService', [function() {
  var ezxmlService = {};

  ezxmlService.getHtmlFromEzxml = function(ezXmlStr) {
    var htmlStr = '';

    if(typeof ezXmlStr !== 'undefined') {
      ezXmlStr = ezXmlStr.replace('<?xml version="1.0"?>', '');
      ezXmlStr = ezXmlStr.replace('<?xml version="1.0" encoding="utf-8"?>', '');
ezXmlStr = ezXmlStr.replace(/<(|\/)literal(|[^>]*)>/g, '');                   // hooked in plain html on store
//ezXmlStr = ezXmlStr.replace(/<paragraph(|[^>]*)><literal(|[^>]*)>/g, '');   // hooked in plain html on store
//ezXmlStr = ezXmlStr.replace(/<\/literal><\/paragraph>/g, '');               // hooked in plain html on store
      ezXmlStr = ezXmlStr.replace(/<br \/>/g, '');                            // this will magicaly inserted by ez xml parser

      ezXmlStr = ezXmlStr.replace(/<header><strong>/g, '<h2>');
      ezXmlStr = ezXmlStr.replace(/<\/strong><\/header>/g, '</h2>');
      ezXmlStr = ezXmlStr.replace(/<paragraph(|[^>]*)><table(|[^>]*)>/g, '<table$2>');
      ezXmlStr = ezXmlStr.replace(/<\/table><\/paragraph>/g, '</table>');
      ezXmlStr = ezXmlStr.replace(/<td(|[^>]*)><paragraph(|[^>]*)>/g, '<td>');
      ezXmlStr = ezXmlStr.replace(/<\/paragraph><\/td>/g, '</td>');
      ezXmlStr = ezXmlStr.replace(/<li(|[^>]*)><paragraph(|[^>]*)>/g, '<li>');
      ezXmlStr = ezXmlStr.replace(/<(|\/)literal(|[^>]*)>/g, '<$1pre$2>');    // has no effect, see second rule
      ezXmlStr = ezXmlStr.replace(/<(|\/)emphasize(|[^>]*)>/g, '<$1em$2>');
      ezXmlStr = ezXmlStr.replace(/<link target="([^"]*)" url="([^"]*)">/g, '<link target="$1" href="$2">');
      ezXmlStr = ezXmlStr.replace(/<(|\/)link/g, '<$1a');
      ezXmlStr = ezXmlStr.replace(/<\/paragraph><\/li>/g, '</li>');
      ezXmlStr = ezXmlStr.replace(/<(|\/)paragraph(|[^>]*)>/g, '<$1p>');
      ezXmlStr = ezXmlStr.replace(/<(|\/)section(|[^>]*)>/g, '');
//console.log(ezXmlStr);
      htmlStr = ezXmlStr.trim();
      ezXmlStr = ezXmlStr.replace(/\n/g, '<br />');                           // convert back own br's
    }

    return htmlStr;
  };

  ezxmlService.getEzxmlFromHtml = function(htmlStr) {
    htmlStr = htmlStr.trim();   // remove newlines from the beginning and end inserted by the editor
    htmlStr = htmlStr.replace('/<br(|[^>]*)>/g', '\n');
    htmlStr = htmlStr.trim();

    var ezXmlStr = '<?xml version="1.0" encoding="utf-8"?><section xmlns:custom="http://ez.no/namespaces/ezpublish3/custom/" xmlns:image="http://ez.no/namespaces/ezpublish3/image/" xmlns:xhtml="http://ez.no/namespaces/ezpublish3/xhtml/"><literal>'+htmlStr+'</literal></section>';
//console.log(ezXmlStr);
    return ezXmlStr.trim();
  };

  return ezxmlService;
}]);
