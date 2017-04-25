'use strict';

/**
 * @ngdoc overview
 * @name kanbanApp
 * @description
 * # kanbanApp
 *
 * Main module of the application.
 */
var app = angular.module('kanbanApp', [
  'ui.router',
  'ncy-angular-breadcrumb',
  'angular-loading-bar',
  'dndLists'
]);



app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.interceptors.push(function($q, $location) {
    return {
      'responseError': function(rejection) {
        if (rejection.status === 401) {
          $location.url("/");
        }
        return $q.reject(rejection);
      }
    };
  });
}]);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('app', {
    url: '/app',
    templateUrl: 'views/main.html'
  });

  $stateProvider.state('app.home', {
    url: '/home',
    templateUrl: 'views/home/home.html',
    data: {
      title: 'Home'
    },
    ncyBreadcrumb: {
      label: 'Home'
    }
  }).state('app.home.teams', {
    url: '/teams',
    templateUrl: 'views/home/teams.html',
    controller: 'TeamsCtrl',
    data: {
      title: 'Teams'
    },
    ncyBreadcrumb: {
      label: 'Team'
    }
  });

  $stateProvider.state('app.home.teams.boards', {
    url: '/boards',
    templateUrl: 'views/home/boards.html',
    controller: 'BoardsCtrl',
    data: {
      title: 'Boards'
    },
    ncyBreadcrumb: {
      label: 'Boards'
    }
  }).state('app.home.teams.boards.boardsDetails', {
    url: '/board/:boardId',
    templateUrl: 'views/home/board.html',
    controller: 'BoardCtrl',
    data: {
      title: 'Board'
    },
    ncyBreadcrumb: {
      label: '{{boardId}}'
    },
   resolve:{
      boardId: ['$stateParams', function($stateParams){
          return $stateParams.boardId;
      }]
   }
  });


  $stateProvider.state('app.dash', {
    url: '/dash',
    templateUrl: 'views/home/dash.html',
    data: {
      title: 'Dash'
    },
    ncyBreadcrumb: {
      label: 'Dash'
    }
  });

  $urlRouterProvider.otherwise('/app/home');
});

app.constant('serverUrl', 'localhost:3000');
