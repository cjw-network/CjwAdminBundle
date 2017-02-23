'use strict';

angular.module('ezpAppCore').factory('accessFactory', ['cjwWebStorageService', function(cjwWebStorageService) {
  var accessFactory = {};

  accessFactory.canContentMove = function(canContentMove) {
    var result = false;
    // permit moving root nodes as admin
    if(canContentMove.pathString !== '/1/2/' && canContentMove.pathString !== '/1/5/' && canContentMove.pathString !== '/1/43/') {
      result = canContentMove.canMove;
    }
    return result;
  };

  accessFactory.canContentRemove = function(canContentRemove) {
    var result = false;
    // permit removing root nodes as admin
    if(canContentRemove.pathString !== '/1/2/' && canContentRemove.pathString !== '/1/5/' && canContentRemove.pathString !== '/1/43/') {
      result = canContentRemove.canRemove;
    }
    return result;
  };

  accessFactory.canContentCreate = function(canCreateParameters) {
    var result = false;

    if(canCreateParameters.isContainer) {
      result = matchAccessList(cjwWebStorageService.get('ezpAccess').ContentCreate,canCreateParameters);
    }

    return result;
  };

  function arrayUnique(value, index, self) { 
    return self.indexOf(value) === index;
  }

  function matchAccessList(accessList,parameters) {
    var result = false;
    var contentTypeList = [];

    for(var accessListKey in accessList) {
      var nextStep = true;
      var policies = accessList[accessListKey].policies;

      // ToDo: SectionLimitation
      if(accessList[accessListKey].hasOwnProperty('SubtreeLimitation')) {
        nextStep = false;
        for(var limitationKey in accessList[accessListKey].SubtreeLimitation) {
          if(parameters.pathString.indexOf(accessList[accessListKey].SubtreeLimitation[limitationKey]) > -1) {
            nextStep = true;
            break;
          }
        }
      }
/*
      // ToDo: SectionLimitation
      if(accessList[accessListKey].hasOwnProperty('SectionLimitation')) {
        nextStep = false;
        for(var limitationKey in accessList[accessListKey].SectionLimitation) {
          if(parameters.pathString.indexOf(accessList[accessListKey].SectionLimitation[limitationKey]) > -1) {
            nextStep = true;
            break;
          }
        }
      }
*/
      // nur ausführen wenn nicht in subtree / section = true
      if(nextStep) {
        for(var policyKey in policies) {
          nextStep = true;

          if(policies[policyKey].hasOwnProperty('ParentContentTypeLimitation')) {
            nextStep = false;
            for(var limitationKey in policies[policyKey].ParentContentTypeLimitation) {
              if(parameters.pathString.indexOf(policies[policyKey].ParentContentTypeLimitation[limitationKey]) > -1) {
                nextStep = true;
                break;
              }
            }
          }

          if(nextStep) {
            if(policies[policyKey].hasOwnProperty('ContentTypeLimitation')) {
// ToDo: if empty or * - break?, check other limitations, languages?
              contentTypeList = contentTypeList.concat(policies[policyKey].ContentTypeLimitation);
            }
          }
        }
      }
    }

    if(contentTypeList.length > 0) {
      result = contentTypeList.filter(arrayUnique);
    }

    return result;
  }

  return accessFactory;
}]);
