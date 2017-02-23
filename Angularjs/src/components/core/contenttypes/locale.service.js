angular.module('ezpAppCore').service('i18nContenttypesService', ['i18nService', function(i18nService) {
  var dictionary = {};

  dictionary['de'] = {
    'true': 'ja',
    'false': 'nein',
// fieldtypes
    'ezauthor': 'Autoren',
    'ezbinaryfile': 'Datei',
    'ezboolean': 'Kontrollkästchen',
    'ezcountry': 'Land',
    'ezdate': 'Datum',
    'ezdatetime': 'Datum und Zeit',
    'ezemail': 'E-Mail',
    'ezenum': '',
    'ezfloat': 'Fließkommawert',
    'ezidentifier': 'Bezeichner',
    'ezimage': 'Bild',
    'ezinisetting': 'Ini Einstellung',
    'ezinteger': 'Ganzzahl',
    'ezisbn': 'ISBN',
    'ezkeyword': 'Schlüsselwörter',
    'ezmatrix': 'Matrix',
    'ezmedia': 'Mediendatei',
    'ezmultioption': 'Mehrfachoption',
    'ezmultioption2': 'Mehrfachoption 2',
    'ezmultiprice': 'Multi-Preis',
    'ezobjectrelation': 'Objekt Verknüpfung',
    'ezobjectrelationlist': 'Objekt Vernüpfungsliste',
    'ezoption': 'Option',
    'ezpackage': 'Paket',
    'eztags': 'Schlagwörter',
    'ezpage': 'Layout',
    'ezprice': 'Preis',
    'ezproductcategory': 'Produkt Kategorie',
    'ezrangeoption': 'Wertebereich Option',
    'ezrichtext': 'Richtext',
    'ezselection': 'Auswahlliste',
    'ezstring': 'Textzeile',
    'ezsubtreesubscription': 'Abonnement des Zweiges',
    'eztext': 'Textabschnitt',
    'eztime': 'Zeit',
    'ezurl': 'URL',
    'ezuser': 'Benutzerkonto',
    'ezxmltext': 'XML Block',
// Sidebar
    'Show all contenttypes': 'Alle Content-Typen anzeigen',
    'New group identifier': 'Neuer Gruppen Bezeichner',
    'Add new group': 'Neue Gruppe hinzufügen',
//
    'Contenttypes': 'Content-Typen',
    'Fields': 'Felder',
    'Groups': 'Gruppen',
    'Features': 'Merkmale',
    'Name': 'Name',
    'Description': 'Beschreibung',
    'Modified': 'Geändert',
    'Id': 'Id',
    'Identifier': 'Bezeichner',
    'Container': 'Behälter',
    'Default availablity': 'Standard Verfügbarkeit',
    'Default sort order': 'Standard Sortierung',
    'Object name schema': 'Objekt Namens Schema',
    'Actions': 'Aktionen',
    'Remove': 'Löschen',
    'Create': 'Anlegen',
    'Edit': 'Bearbeiten',
    'Publish': 'Veröffentlichen',
    'Cancel': 'Abbrechen'
  };

  dictionary['en'] = {
    'true': 'yes',
    'false': 'no'
// fieldtypes
  };

  i18nService.appendDictonary('contenttypes',dictionary);
}]);
