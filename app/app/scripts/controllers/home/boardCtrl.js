app.controller('BoardCtrl', ['$scope', '$state', 'boardId', 'EntityService', '$uibModal', 'ListService', '$timeout', function($scope, $state, boardId, EntityService, $uibModal, ListService, $timeout) {

  console.log("In BoardCtrl ");
  $scope.boardId = boardId;
  $scope.entity = "list";


  EntityService.getById("board", boardId).then(function(resp) {
    $scope.board = resp.data;
  }, function(error) {
    $scope.error = error;
    $scope.showError = true;
    $timeout(function() {
      $scope.showError = false;
    }, 5000);
  });

  $scope.listModels = {
    selected: null,
    lists: []
  };

  $scope.refresh = function() {
    $scope.listModels = {
      selected: null,
      lists: []
    };
    ListService.getAll($scope.entity, boardId).then(function(resp) {
      $scope.lists = resp.data;

      angular.forEach($scope.lists, function(val, key) {
        var tempList = {};
        tempList.name = val.name;
        //tempList.items = val.cards;
        $scope.listModels.lists.push(tempList);
      });


      // {
      //     name: "Category 1",
      //     items: [{
      //       name: "Item 1.1",
      //       description :"hee"
      //     }, {
      //       name: "Item 1.2",
      //       description :"hee"
      //     }, {
      //       name: "Item 1.3",
      //       description :"hee"
      //     }]
      //   },

    }, function(error) {
      $scope.error = error;
      $scope.showError = true;
      $timeout(function() {
        $scope.showError = false;
      }, 5000);
    });
  }
  $scope.refresh();

  $scope.addList = function() {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'createListModal.html',
      controller: 'CreateListCtrl',
      resolve: {
        boardId: function() {
          return $scope.boardId;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $scope.refresh();
    });
  }


  $scope.deleteList = function(list) {
    angular.forEach($scope.lists, function(val, key) {
      if (val.name == list.name) {
        list = angular.copy(val);
      }
    });
    EntityService.delete($scope.entity, list._id).then(function(resp) {
      EntityService.showSuccessMsg("List: " + EntityService.titleCase()(list.name) + " Deleted Successfully");
      $scope.refresh();

    }, function(error) {
      $scope.error = error;
      $scope.showError = true;
      $timeout(function() {
        $scope.showError = false;
      }, 5000);
    });
  }

  $scope.editList = function(list) {

    angular.forEach($scope.lists, function(val, key) {
      if (val.name == list.name) {
        list = angular.copy(val);
      }
    });

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'editListModal.html',
      controller: 'EditListCtrl',
      resolve: {
        list: function() {
          return list;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $scope.refresh();
    });
  }






  // $scope.models = {
  //   selected: null,
  //   lists: [{
  //     name: "Category 1",
  //     items: [{
  //       name: "Item 1.1",
  //       description :"hee"
  //     }, {
  //       name: "Item 1.2",
  //       description :"hee"
  //     }, {
  //       name: "Item 1.3",
  //       description :"hee"
  //     }]
  //   }, {
  //     name: "Category 2",
  //     items: [{
  //       name: "Item 2.1",
  //       description :"hee"
  //     }, {
  //       name: "Item 2.2",
  //       description :"hee"
  //     }, {
  //       name: "Item 2.3",
  //       description :"hee"
  //     }]
  //   }, {
  //     name: "Category 3",
  //     items: [{
  //       name: "Item 3.1",
  //       description :"hee"
  //     }, {
  //       name: "Item 3.2",
  //       description :"hee"
  //     }, {
  //       name: "Item 3.3",
  //       description :"hee"
  //     }]
  //   },
  //   {
  //     name: "Category 4",
  //     items: [{
  //       name: "Item 3.1",
  //       description :"hee"
  //     }, {
  //       name: "Item 3.2",
  //       description :"hee"
  //     }, {
  //       name: "Item 3.3",
  //       description :"hee"
  //     }]
  //   }]
  // };

}]);


app.controller('CreateListCtrl', ['$scope', '$state', '$uibModalInstance', 'EntityService', '$timeout', 'boardId',
  function($scope, $state, $uibModalInstance, EntityService, $timeout, boardId) {
    $scope.list = {};
    $scope.entity = "list";
    $scope.ok = function(list) {
      if (angular.isUndefined(list.name) && angular.isUndefined(list.description)) {
        $scope.error = "Please Enter Name and description!";
        $scope.showError = true;
        $timeout(function() {
          $scope.showError = false;
        }, 5000);
      } else {
        $scope.list = list;
        $scope.list.boardId = boardId;
        EntityService.add($scope.entity, $scope.list)
          .then(function(resp) {
            $uibModalInstance.dismiss('cancel');
            EntityService.showSuccessMsg("Board: " + EntityService.titleCase()($scope.list.name) + " Created Successfully");
            //EntityService.showSuccessMsg("PivotGrids Copied Successfully");
          }, function(error) {
            $scope.error = error.data.message;
            $scope.showError = true;
            $timeout(function() {
              $scope.showError = false;
            }, 5000);
            console.log(error.data.developerMessage);
          });
      }

    };

    $scope.cancel = function() {
      $scope.board = {};
      $uibModalInstance.dismiss('cancel');
    };

  }
]);


app.controller('EditListCtrl', ['$scope', '$state', '$uibModalInstance', 'EntityService', '$timeout', 'list',
  function($scope, $state, $uibModalInstance, EntityService, $timeout, list) {
    $scope.list = list;
    $scope.entity = "list";
    $scope.ok = function(newlist) {
      if (angular.isUndefined(newlist.name) && angular.isUndefined(newlist.description)) {
        $scope.error = "Please Enter Name and description!";
        $scope.showError = true;
        $timeout(function() {
          $scope.showError = false;
        }, 5000);
      } else {
        $scope.list = newlist;
        EntityService.update($scope.entity, $scope.list._id, $scope.list)
          .then(function(resp) {
            $uibModalInstance.dismiss('cancel');
            EntityService.showSuccessMsg("List: " + EntityService.titleCase()($scope.list.name) + " Updated Successfully");
          }, function(error) {
            $scope.error = error.data.message;
            $scope.showError = true;
            $timeout(function() {
              $scope.showError = false;
            }, 5000);
            console.log(error.data.developerMessage);
          });
      }

    };

    $scope.cancel = function() {
      $scope.list = {};
      $uibModalInstance.dismiss('cancel');
    };
  }
]);


//Service for controller
app.service('ListService', ['$http', 'serverUrl', function($http, serverUrl) {
  this.getAll = function(entityName, teamId) {
    return $http({
      method: 'GET',
      url: serverUrl + "api/" + entityName + "/getAll/" + teamId
    });
  };

}]);
