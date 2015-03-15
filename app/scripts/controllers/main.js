'use strict';

/**
 * @ngdoc function
 * @name kibanaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kibanaApp
 */
angular.module('kibanaApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
