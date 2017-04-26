app.controller('BoardsCtrl', ['$scope', '$state', 'EntityService', '$uibModal', 'teamId', 'BoardsService', function($scope, $state, EntityService, $uibModal, teamId, BoardsService) {

  console.log("In BoardsCtrl ");
  $scope.entity = "board";

  $scope.refresh = function() {
    BoardsService.getAll($scope.entity, teamId).then(function(resp) {
      $scope.boards = resp.data;
    }, function(error) {
      $scope.error = error;
      $scope.showError = true;
      $timeout(function() {
        $scope.showError = false;
      }, 5000);
    });
  }
  $scope.refresh();

  $scope.addBoard = function() {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'createBoardModal.html',
      controller: 'CreateBoardCtrl',
      resolve: {
        teamId: function() {
          return teamId;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $scope.refresh();
    });
  }


  $scope.deleteBoard = function(board) {
    EntityService.delete($scope.entity, board._id).then(function(resp) {
      EntityService.showSuccessMsg("Board: " + EntityService.titleCase()(board.name) + " Deleted Successfully");
      $scope.refresh();

    }, function(error) {
      $scope.error = error;
      $scope.showError = true;
      $timeout(function() {
        $scope.showError = false;
      }, 5000);
    });
  }

  $scope.editBoard = function(board) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'editBoardModal.html',
      controller: 'EditBoardCtrl',
      resolve: {
        board: function() {
          return board;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $scope.refresh();
    });
  }

}]);

app.controller('CreateBoardCtrl', ['$scope', '$state', '$uibModalInstance', 'EntityService', '$timeout', 'teamId',
  function($scope, $state, $uibModalInstance, EntityService, $timeout, teamId) {
    $scope.board = {};
    $scope.entity = "board";
    $scope.ok = function(board) {
      if (angular.isUndefined(board.name) && angular.isUndefined(board.description)) {
        $scope.error = "Please Enter Name and description!";
        $scope.showError = true;
        $timeout(function() {
          $scope.showError = false;
        }, 5000);
      } else {
        $scope.board = board;
        $scope.board.teamId = teamId;
        EntityService.add($scope.entity, $scope.board)
          .then(function(resp) {
            $uibModalInstance.dismiss('cancel');
            EntityService.showSuccessMsg("Board: " + EntityService.titleCase()($scope.board.name) + " Created Successfully");
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


app.controller('EditBoardCtrl', ['$scope', '$state', '$uibModalInstance', 'EntityService', '$timeout', 'board',
  function($scope, $state, $uibModalInstance, EntityService, $timeout, board) {
    $scope.board = board;
    $scope.entity = "board";

    $scope.ok = function(newboard) {
      if (angular.isUndefined(newboard.name) && angular.isUndefined(newboard.description)) {
        $scope.error = "Please Enter Name and description!";
        $scope.showError = true;
        $timeout(function() {
          $scope.showError = false;
        }, 5000);
      } else {
        $scope.board = newboard;

        EntityService.update($scope.entity, $scope.board._id, $scope.board)
          .then(function(resp) {
            $uibModalInstance.dismiss('cancel');
            EntityService.showSuccessMsg("Board: " + EntityService.titleCase()($scope.board.name) + " Updated Successfully");
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

//Service for controller
app.service('BoardsService', ['$http', 'serverUrl', function($http, serverUrl) {
  this.getAll = function(entityName, teamId) {
    return $http({
      method: 'GET',
      url: serverUrl + "api/" + entityName + "/getAll/" + teamId
    });
  };

}]);
