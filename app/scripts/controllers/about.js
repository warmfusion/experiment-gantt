'use strict';

/**
 * @ngdoc function
 * @name timelineApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the timelineApp
 */
angular.module('timelineApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
