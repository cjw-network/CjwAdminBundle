angular.module('ezpAppCore').service('i18nContentService', ['i18nService', function(i18nService) {
  var dictionary = {};

  dictionary['en'] = {
    'true': 'yes',
    'false': 'no',
    'ARCHIVED': 'Archived',
    'PUBLISHED': 'Published',
    'DRAFT': 'Draft'
  };

  dictionary['de'] = {
// content home
    'Remove': 'Löschen',
    'Create': 'Anlegen',
    'Edit': 'Bearbeiten',
    'Move': 'Verschieben',
// location Path
    'You are here': 'Sie sind hier',
// content view tabs
    'Content': 'Inhalte',
    'Details': 'Details',
    'Versions': 'Versionen',
    'Locations': 'Orte',
    'Relations': 'Verknüpfungen',
    'Languages': 'Sprachen',
    'Extras': 'Extras',
// content modal
    'Close': 'Schließen',
    'Publish': 'Veröffentlichen',
    'Select': 'Auswählen',
//    'Remove': 'Löschen',
// location children
    'Name': 'Name',
    'Language': 'Sprache',
    'Hidden': 'Versteckt',
    'Section': 'Sektion',
    'Contentype': 'Inhaltstyp',
    'Modified': 'Geändert',
    'Published': 'Veröffentlicht',
    'Priority': 'Priorität',
    'true': 'ja',
    'false': 'nein',
// content versions
    'Version': 'Version',
    'Status': 'Status',
//    'Published': 'Geändert',
//    'Modified': 'Veröffentlicht',
    'Creator': 'Ersteller',
//    'Language': 'Sprache',
    'ARCHIVED': 'Archiviert',
    'PUBLISHED': 'Veröffentlicht',
    'DRAFT': 'Entwurf',
// content locations
    'Location': 'Ort',
    'Children': 'Kinder',
//    'Hidden': '',
    'Main location': 'Hauptort',
    'Remove location': 'Ort entfernen',
    'Add location': 'Ort hinzufügen',
    'Set main location': 'Hauptort setzen',
// content relations
    'No relations set': 'es sind keine Verknüpfungen vorhanden',
    
// sidebar
    'Content structure': 'Inhalts-Struktur',
    'My settings': 'Meine Einstellungen',
    'Bookmarks': 'Lesezeichen',
    'Search': 'Suche',
    'Search in content': "in 'Inhalte' suchen",
    'Multiupload': 'Multiupload',
// search
    'Search content': 'Inhalte suchen'
  };

  i18nService.appendDictonary('content',dictionary);
}]);
