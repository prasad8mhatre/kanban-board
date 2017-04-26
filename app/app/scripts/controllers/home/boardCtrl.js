app.controller('BoardCtrl', ['$scope', '$state', 'boardId', 'EntityService', '$uibModal', 'ListService', '$timeout', 'CardService', '$q', function($scope, $state, boardId, EntityService, $uibModal, ListService, $timeout, CardService, $q) {

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
    var cardList = [];


    ListService.getAll($scope.entity, boardId).then(function(resp) {
      $scope.lists = resp.data;
      var promises = [];
      angular.forEach($scope.lists, function(val, key) {
        var tempList = {};
        tempList.name = val.name;
        tempList.items = [];
        promises.push(CardService.getAll("card", val._id));

        //tde
        $scope.listModels.lists.push(tempList);
      });

      $q.all(promises).then(function(results) {

        for (var i = 0; i < results.length; i++) {
          var result = results[i];

          $scope.listModels.lists[i].items = results[i].data;
          //vm.images_selected_uploaded.push(result);
          console.log('here');
        }
        console.log('there');
        //console.log(vm.images_selected_uploaded);
      })


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

  //For Cards

  $scope.addCard = function(listName) {

    angular.forEach($scope.lists, function(val, key) {
      if (val.name == listName) {
        list = angular.copy(val);
      }
    });
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'createCardModal.html',
      controller: 'CreateCardCtrl',
      resolve: {
        ListId: function() {
          return list._id;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $scope.refresh();
    });
  }


  $scope.deleteCard = function(card) {

    // angular.forEach($scope.lists, function(val, key) {
    //   if (val.name == card.name) {
    //     card = angular.copy(val);
    //   }
    // });
    EntityService.delete('card', card._id).then(function(resp) {
      EntityService.showSuccessMsg("Task: " + EntityService.titleCase()(card.name) + " Deleted Successfully");
      $scope.refresh();

    }, function(error) {
      $scope.error = error;
      $scope.showError = true;
      $timeout(function() {
        $scope.showError = false;
      }, 5000);
    });
  }

  $scope.editCard = function(card) {


    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'editCardModal.html',
      controller: 'EditCardCtrl',
      resolve: {
        card: function() {
          return card;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $scope.refresh();
    });
  }


  //SortCards
  $scope.sortCards = function(list) {


    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'sortCardModal.html',
      controller: 'SortCardCtrl',
      resolve: {
        list: function() {
          return list;
        },
        lists: function() {
          return $scope.lists;
        },
        order: function() {
          return $scope.order;
        }
      }
    });

    modalInstance.result.then(function(resp) {
      $scope.listModels.lists[findIndexOfElement($scope.listModels, list.name)].items = resp.data;
      $scope.order = resp.order;
    }, function() {
      $scope.refresh();
    });

    var findIndexOfElement = function(list, name) {
      var index = -1;
      angular.forEach(list.lists, function(val, key) {
        if (val.name == name) {
          index = key;
        }
      });
      return index;
    }

  }


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

// Cards

app.controller('CreateCardCtrl', ['$scope', '$state', '$uibModalInstance', 'EntityService', '$timeout', 'ListId',
  function($scope, $state, $uibModalInstance, EntityService, $timeout, ListId) {
    $scope.card = {};
    $scope.card.dueDate = new Date();
    $scope.entity = "card";
    $scope.priorities = ["1", "2", "3", "4", "5"];
    $scope.changePriority = function() {

    }

    $scope.ok = function(card) {
      if (angular.isUndefined(card.name) && angular.isUndefined(card.description)) {
        $scope.error = "Please Enter Name and description!";
        $scope.showError = true;
        $timeout(function() {
          $scope.showError = false;
        }, 5000);
      } else {

        $scope.card = card;
        $scope.card.listId = ListId;
        EntityService.add($scope.entity, $scope.card)
          .then(function(resp) {
            $uibModalInstance.dismiss('cancel');
            EntityService.showSuccessMsg("Board: " + EntityService.titleCase()($scope.card.name) + " Created Successfully");
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


app.controller('EditCardCtrl', ['$scope', '$state', '$uibModalInstance', 'EntityService', '$timeout', 'card',
  function($scope, $state, $uibModalInstance, EntityService, $timeout, card) {
    $scope.card = card;

    $scope.priorities = ["1", "2", "3", "4", "5"];
    $scope.entity = "card";
    $scope.changePriority = function() {

    }
    $scope.ok = function(newCard) {

      if (angular.isUndefined(newCard.name) && angular.isUndefined(newCard.description)) {
        $scope.error = "Please Enter Name and description!";
        $scope.showError = true;
        $timeout(function() {
          $scope.showError = false;
        }, 5000);
      } else {
        $scope.card = newCard;
        EntityService.update($scope.entity, $scope.card._id, $scope.card)
          .then(function(resp) {
            $uibModalInstance.dismiss('cancel');
            EntityService.showSuccessMsg("Task: " + EntityService.titleCase()($scope.card.name) + " Updated Successfully");
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
      $scope.card = {};
      $uibModalInstance.dismiss('cancel');
    };
  }
]);

app.controller('SortCardCtrl', ['$scope', '$state', '$uibModalInstance', 'EntityService', '$timeout', 'list', 'CardService', 'lists', 'order',
  function($scope, $state, $uibModalInstance, EntityService, $timeout, list, CardService, lists, order) {
    $scope.list = list;
    $scope.order = angular.isUndefined(order) ? {
      field: "priority",
      sortOrder: "DESC"
    } : order;
    $scope.field = ["priority", "dueDate", "name"];
    $scope.sortOrder = ["DESC", "ASC"];
    $scope.entity = "list";
    $scope.ok = function(order) {
      $scope.order = order;
      if (angular.isUndefined(order.field) && angular.isUndefined(order.sortOrder)) {
        $scope.error = "Please select field and order!";
        $scope.showError = true;
        $timeout(function() {
          $scope.showError = false;
        }, 5000);
      } else {
        angular.forEach(lists, function(val, key) {
          if (val.name == list.name) {
            list = angular.copy(val);
          }
        });


        CardService.getAllOrderby('card', list._id, order.field, convertOrder(order.sortOrder)).then(function(resp) {

          $uibModalInstance.close({
            data: resp.data,
            order: $scope.order
          });
          EntityService.showSuccessMsg("Task: " + EntityService.titleCase()($scope.list.name) + " Sorted Successfully");
        });
      }
    };


    var convertOrder = function(orderType) {
      if (orderType == "DESC") {
        return -1;
      } else {
        return 1;
      }
    }





    $scope.cancel = function() {
      $scope.order = {};
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

app.service('CardService', ['$http', 'serverUrl', function($http, serverUrl) {
  this.getAll = function(entityName, listId) {
    return $http({
      method: 'GET',
      url: serverUrl + "api/" + entityName + "/getAll/" + listId
    });
  };

  this.getAllOrderby = function(entityName, listId, orderColumn, sortOrder) {
    var data = {};
    data.orderType = orderColumn;
    data.order = sortOrder;
    data.listId = listId;
    return $http({
      method: 'POST',
      url: serverUrl + "api/" + entityName + "/orderBy",
      data: data
    });
  };
}]);
