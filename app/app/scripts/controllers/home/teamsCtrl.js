'use strict';

app.controller('TeamsCtrl', ['$scope', '$state', 'EntityService', '$uibModal', function($scope, $state, EntityService, $uibModal) {

  console.log("In Team Ctrl");
  $scope.entity = "team";

  $scope.refresh = function() {
    EntityService.getAll($scope.entity).then(function(resp) {
      $scope.teams = resp.data;
    }, function(error) {
      $scope.error = error;
      $scope.showError = true;
      $timeout(function() {
        $scope.showError = false;
      }, 5000);
    });
  }
  $scope.refresh();

  $scope.addTeam = function() {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'createTeamModal.html',
      controller: 'CreateTeamCtrl'
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $scope.refresh();
    });
  }


  $scope.deleteTeam = function(team) {
    EntityService.delete($scope.entity, team._id).then(function(resp) {
      EntityService.showSuccessMsg("Team: " + EntityService.titleCase()(team.name) + " Deleted Successfully");
      $scope.refresh();

    }, function(error) {
      $scope.error = error;
      $scope.showError = true;
      $timeout(function() {
        $scope.showError = false;
      }, 5000);
    });
  }

  $scope.editTeam = function(team) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'editTeamModal.html',
      controller: 'EditTeamCtrl',
      resolve: {
        team: function() {
          return team;
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

app.controller('CreateTeamCtrl', ['$scope', '$state', '$uibModalInstance', 'EntityService', '$timeout',
  function($scope, $state, $uibModalInstance, EntityService, $timeout) {
    $scope.team = {};
    $scope.entity = "team";
    $scope.ok = function(team) {
      if (angular.isUndefined(team.name) && angular.isUndefined(team.description)) {
        $scope.error = "Please Enter Name and description!";
        $scope.showError = true;
        $timeout(function() {
          $scope.showError = false;
        }, 5000);
      } else {
        $scope.team = team;
        EntityService.add($scope.entity, $scope.team)
          .then(function(resp) {
            $uibModalInstance.dismiss('cancel');
            EntityService.showSuccessMsg("Team: " + EntityService.titleCase()($scope.team.name) + " Created Successfully");
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
      $scope.team = {};
      $uibModalInstance.dismiss('cancel');
    };


  }
]);


app.controller('EditTeamCtrl', ['$scope', '$state', '$uibModalInstance', 'EntityService', '$timeout','team',
  function($scope, $state, $uibModalInstance, EntityService, $timeout, team) {
    $scope.team = team;
    $scope.entity = "team";
    $scope.ok = function(newteam) {
      if (angular.isUndefined(newteam.name) && angular.isUndefined(newteam.description)) {
        $scope.error = "Please Enter Name and description!";
        $scope.showError = true;
        $timeout(function() {
          $scope.showError = false;
        }, 5000);
      } else {
        $scope.team = newteam;
        EntityService.update($scope.entity, $scope.team._id, $scope.team)
          .then(function(resp) {
            $uibModalInstance.dismiss('cancel');
            EntityService.showSuccessMsg("Team: " + EntityService.titleCase()($scope.team.name) + " Updated Successfully");
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
      $scope.team = {};
      $uibModalInstance.dismiss('cancel');
    };


  }
]);



//Service for controller
app.service('TeamsService', ['$http', 'serverUrl', function($http, serverUrl) {


}]);
