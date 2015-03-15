'use strict';

/**
 * @ngdoc function
 * @name kibanaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the kibanaApp
 */
angular.module('kibanaApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
