'use strict';

/**
 * @ngdoc overview
 * @name timelineApp
 * @description
 * # timelineApp
 *
 * Main module of the application.
 */
angular
  .module('timelineApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'ui.tree',
    'elasticsearch',
    'gantt',
    'gantt.tree'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'Search'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
