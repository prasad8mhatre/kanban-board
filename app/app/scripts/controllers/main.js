'use strict';

/**
 * @ngdoc function
 * @name kanbanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kanbanApp
 */
app.controller('MainCtrl', ['$scope', '$state', function($scope, $state) {

  console.log("In Main Ctrl");
  $scope.Hello = "Hello";

}]);


app.service('AuthService', function($http, serverUrl) {
  this.getCurrentUser = function() {
    return $http({
      method: 'GET',
      url: serverUrl + "services/session/currentUser"
    });
  };

  this.logout = function() {
    return $http({
      method: 'GET',
      url: serverUrl + "j_spring_security_logout"
    });
  };

});

app.service('EntityService', ['$http', 'serverUrl', 'toastr', function($http, serverUrl, toastr) {

  this.add = function(entityName, entity) {
    return $http({
      method: 'POST',
      url: serverUrl + "api/" + entityName,
      data: entity
    });
  };

  this.delete = function(entityName, entityId) {
    return $http({
      method: 'DELETE',
      url: serverUrl + "api/" + entityName + "/" + entityId
    });
  };

  this.getAll = function(entityName) {
    return $http({
      method: 'GET',
      url: serverUrl + "api/" + entityName
    });
  };

  this.get = function(entityName, entityId) {
    return $http({
      method: 'GET',
      url: serverUrl + "api/" + entityName + "/" + entityId
    });
  };

  this.update = function(entityName, entityId, entity) {
    return $http({
      method: 'PUT',
      url: serverUrl + "api/" + entityName + "/" + entityId,
      data: entity
    });
  };

  this.selectedEntity = undefined;

  this.set = function(entity) {
    this.selectedEntity = entity;
  };

  this.get = function() {
    return this.selectedEntity;
  };

  this.showSuccessMsg = function(message) {
    toastr.success('', message);
  };

  this.showErrorMsg = function(message) {
    toastr.error('Error', message);
  };

  this.showInfoMsg = function(message) {
    toastr.info(message);
  };

  this.showWarningMsg = function(message) {
    toastr.warning('', message);
  };

  this.titleCase = function(input) {
    return function(input) {
      input = input || '';
      return input.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };
  }

}]);


app.filter('titleCase', function() {
  return function(input) {
    input = input || '';
    return input.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
})
