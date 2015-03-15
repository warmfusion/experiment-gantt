'use strict';

/**
 * @ngdoc function
 * @name timelineApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the timelineApp
 */
var TimelineApp = angular.module('timelineApp');


    TimelineApp.controller('Search', function ($scope, client) {
        $scope.todos = ['item one'];
        $scope.addTodo = function () {
          $scope.todos.push($scope.todo);
          $scope.todo = '';
        };

        $scope.removeTodo = function (idx) {
          $scope.todos.splice(idx,1);
        };

        $scope.search = function () {
          client.search({
            q: $scope.todo
          }).then(function (body) {
            var hits = body.hits.hits;
            $scope.searchRaw = body.hits.hits;
          }, function (error) {
            console.trace(error.message);
          });
        };

      });

    // Service
    //
    // esFactory() creates a configured client instance. Turn that instance
    // into a service so that it can be required by other parts of the application

    TimelineApp.service('client', function (esFactory) {
      return esFactory({
        host: '192.168.33.10:9200',
        apiVersion: '1.2',
        log: 'trace'
      });
    });


    // Controller
    //
    // It requires the "client" service, and fetches information about the server,
    // it adds either an error or info about the server to $scope.
    //
    // It also requires the esFactory to that it can check for a specific type of
    // error which might come back from the client
    TimelineApp.controller('TimelineController', function ($scope, client, esFactory) {
      client.cluster.state({
        metric: [
          'cluster_name',
          'nodes',
          'master_node',
          'version'
        ]
      })
      .then(function (resp) {
        $scope.clusterState = resp;
        $scope.error = null;
      })
      .catch(function (err) {
        $scope.clusterState = null;
        $scope.error = err;
        // if the err is a NoConnections error, then the client was not able to
        // connect to elasticsearch. In that case, create a more detailed error
        // message
        if (err instanceof esFactory.errors.NoConnections) {
          $scope.error = new Error('Unable to connect to elasticsearch. ' +
            'Make sure that it is running and listening at http://192.168.33.10:9200');
        }
      });
    });