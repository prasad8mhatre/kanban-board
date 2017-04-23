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
    'ui.router'
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
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    });

    $stateProvider.state('app.home', {
        url: '/home',
        templateUrl: 'views/home/home.html',
        controller: 'HomeCtrl',
        data: {
            title: 'Home'
        }
    });


     $stateProvider.state('app.home.teams', {
        url: '/teams',
        templateUrl: 'views/home/teams.html',
        controller: 'TeamsCtrl',
        data: {
            title: 'Teams'
        }
    });

    $urlRouterProvider.otherwise('/app/home');
});

app.constant('serverUrl', 'localhost:3000');
