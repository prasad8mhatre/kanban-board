'use strict';

app.controller('TeamsCtrl', [ '$scope', '$state', function($scope, $state) {

   console.log("In Team Ctrl");
   $scope.Hello = "Hello";

   $scope.teams = ["1","2","3","4","5","6","7","8","9","10","11","12"];

}]);
