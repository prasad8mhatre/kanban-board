app.controller('BoardCtrl', ['$scope', '$state', 'boardId', function($scope, $state, boardId) {

  console.log("In BoardCtrl ");
  $scope.Hello = "Hello";
  $scope.lists = ["1", "2", "3"];
  $scope.boardId = boardId;

  $scope.models = {
    selected: null,
    lists: [{
      name: "Category 1",
      items: [{
        name: "Item 1.1",
        description :"hee"
      }, {
        name: "Item 1.2",
        description :"hee"
      }, {
        name: "Item 1.3",
        description :"hee"
      }]
    }, {
      name: "Category 2",
      items: [{
        name: "Item 2.1",
        description :"hee"
      }, {
        name: "Item 2.2",
        description :"hee"
      }, {
        name: "Item 2.3",
        description :"hee"
      }]
    }, {
      name: "Category 3",
      items: [{
        name: "Item 3.1",
        description :"hee"
      }, {
        name: "Item 3.2",
        description :"hee"
      }, {
        name: "Item 3.3",
        description :"hee"
      }]
    },
    {
      name: "Category 4",
      items: [{
        name: "Item 3.1",
        description :"hee"
      }, {
        name: "Item 3.2",
        description :"hee"
      }, {
        name: "Item 3.3",
        description :"hee"
      }]
    }]
  };

}]);
