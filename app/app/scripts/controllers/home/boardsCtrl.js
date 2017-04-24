app.controller('BoardsCtrl', [ '$scope', '$state', function($scope, $state) {

   console.log("In BoardsCtrl ");
   $scope.Hello = "Hello";
   $scope.boards = ["1","2","3"];

}]);
