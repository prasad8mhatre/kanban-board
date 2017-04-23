'use strict';

/**
 * @ngdoc function
 * @name kanbanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kanbanApp
 */
 app.controller('MainCtrl', [ '$scope', '$state', function($scope, $state) {

    console.log("In Main Ctrl");
    $scope.Hello = "Hello";

 }]);
