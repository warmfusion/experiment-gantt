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
  $scope.hits = [];

  $scope.headersFormats = { 
    dat: 'd',
    hour: 'H', 
    minute:'mm',
    second: 's',
    millisecond: 'SSS'
  };

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
      $scope.hits = body.hits.hits;
      $scope.searchRaw = body.hits.hits;

      var ganttdata = [];
      angular.forEach(body.hits.hits, function(value) {
        if (value._source['@timestamp'] !== undefined ) {
          this.push(
            [ value._source['@timestamp'],
            value._source['@timestamp'],
            value._id
            ]);
        }
      }, ganttdata);


      ganttdata = [
        {name: 'horse', 
          tasks: [
             { name: 'Builder', height:'3em', classes: 'gantt-row-milestone', from: new Date(2013, 3, 13, 4, 4, 13), to: new Date(2013, 3, 13, 4, 5, 50) }
          ]},
        {name: 'cat',   parent:'dog', 
          tasks:[
            {name: 'Page Builder executed on box01', from: new Date(2013, 3, 13, 4, 5, 51), to: new Date(2013, 3, 13, 4, 6, 6) },
            {name: 'Page Builder executed on box02', from: new Date(2013, 3, 13, 4, 5, 54), to: new Date(2013, 3, 13, 4, 6, 16) },
            {name: 'Page Builder executed on box03', from: new Date(2013, 3, 13, 4, 6,  5), to: new Date(2013, 3, 13, 4, 6, 27) },
          ]},
        {name: 'mouse', parent: 'cat',
          tasks: [
            { name: 'mouse-work', height:'3em', classes: 'gantt-row-milestone', from: new Date(2013, 3, 13, 4, 6, 12), to: new Date(2013, 3, 13, 4, 6, 50) }
          ]},
        {name: 'dog',   parent:'horse', 
          tasks: [
           { name: 'Dog Builder executed on box03', from: new Date(2013, 3, 13, 4, 5, 58), to: new Date(2013, 3, 13, 4, 6, 36) },
         ]},
        ];

      // ganttdata = [
      // {name: 'Milestones', height: '3em', sortable: {enabled: false}, classes: 'gantt-row-milestone', color: '#45607D', data: 'Can contain any custom data or object',
      //   tasks: [
      //   {name: 'Kickoff', color: '#93C47D', from: '2013-10-07T09:00:00', 
      //   to: '2013-10-07T10:00:00', data: 'Can contain any custom data or object'},
      //   {name: 'Concept approval', color: '#93C47D', from: new Date(2013, 9, 18, 18, 0, 0), to: new Date(2013, 9, 18, 18, 0, 0), est: new Date(2013, 9, 16, 7, 0, 0), lct: new Date(2013, 9, 19, 0, 0, 0)},
      //   {name: 'Development finished', color: '#93C47D', from: new Date(2013, 10, 15, 18, 0, 0), to: new Date(2013, 10, 15, 18, 0, 0)},
      //   {name: 'Shop is running', color: '#93C47D', from: new Date(2013, 10, 22, 12, 0, 0), to: new Date(2013, 10, 22, 12, 0, 0)},
      //   {name: 'Go-live', color: '#93C47D', from: new Date(2013, 10, 29, 16, 0, 0), to: new Date(2013, 10, 29, 16, 0, 0)}
      //   ]},
      //   {name: 'Status meetings', tasks: [
      //     {name: 'Demo', color: '#9FC5F8', from: new Date(2013, 9, 25, 15, 0, 0), to: new Date(2013, 9, 25, 18, 30, 0)},
      //     {name: 'Demo', color: '#9FC5F8', from: new Date(2013, 10, 1, 15, 0, 0), to: new Date(2013, 10, 1, 18, 0, 0)},
      //     {name: 'Demo', color: '#9FC5F8', from: new Date(2013, 10, 8, 15, 0, 0), to: new Date(2013, 10, 8, 18, 0, 0)},
      //     {name: 'Demo', color: '#9FC5F8', from: new Date(2013, 10, 15, 15, 0, 0), to: new Date(2013, 10, 15, 18, 0, 0)},
      //     {name: 'Demo', color: '#9FC5F8', from: new Date(2013, 10, 24, 9, 0, 0), to: new Date(2013, 10, 24, 10, 0, 0)}
      //     ]},
      //   {name: 'Kickoff', movable: {allowResizing: false}, tasks: [
      //   {name: 'Day 1', color: '#9FC5F8', from: new Date(2013, 9, 7, 9, 0, 0), to: new Date(2013, 9, 7, 17, 0, 0),
      //   progress: {percent: 100, color: '#3C8CF8'}, movable: {enabled: false}},
      //   {name: 'Day 2', color: '#9FC5F8', from: new Date(2013, 9, 8, 9, 0, 0), to: new Date(2013, 9, 8, 17, 0, 0),
      //   progress: {percent: 100, color: '#3C8CF8'}},
      //   {name: 'Day 3', color: '#9FC5F8', from: new Date(2013, 9, 9, 8, 30, 0), to: new Date(2013, 9, 9, 12, 0, 0),
      //   progress: {percent: 100, color: '#3C8CF8'}}
      //   ]},
      //   {name: 'Create concept', tasks: [
      //   {name: 'Create concept', color: '#F1C232', from: new Date(2013, 9, 10, 8, 0, 0), to: new Date(2013, 9, 16, 18, 0, 0), est: new Date(2013, 9, 8, 8, 0, 0), lct: new Date(2013, 9, 18, 20, 0, 0),
      //   progress: 100}
      //   ]},
      //   {name: 'Finalize concept', tasks: [
      //   {name: 'Finalize concept', color: '#F1C232', from: new Date(2013, 9, 17, 8, 0, 0), to: new Date(2013, 9, 18, 18, 0, 0),
      //   progress: 100}
      //   ]},
      //   {name: 'Sprint 1', tooltips: {enabled: false}, tasks: [
      //   {name: 'Product list view', color: '#F1C232', from: new Date(2013, 9, 21, 8, 0, 0), to: new Date(2013, 9, 25, 15, 0, 0),
      //   progress: 25}
      //   ]},
      //   {name: 'Sprint 2', tasks: [
      //   {name: 'Order basket', color: '#F1C232', from: new Date(2013, 9, 28, 8, 0, 0), to: new Date(2013, 10, 1, 15, 0, 0)}
      //   ]},
      //   {name: 'Sprint 3', tasks: [
      //   {name: 'Checkout', color: '#F1C232', from: new Date(2013, 10, 4, 8, 0, 0), to: new Date(2013, 10, 8, 15, 0, 0)}
      //   ]},
      //   {name: 'Sprint 4', tasks: [
      //   {name: 'Login&Singup and admin view', color: '#F1C232', from: new Date(2013, 10, 11, 8, 0, 0), to: new Date(2013, 10, 15, 15, 0, 0)}
      //   ]},
      //   {name: 'Setup server', tasks: [
      //   {name: 'HW', color: '#F1C232', from: new Date(2013, 10, 18, 8, 0, 0), to: new Date(2013, 10, 18, 12, 0, 0)}
      //   ]},
      //   {name: 'Config server', tasks: [
      //   {name: 'SW / DNS/ Backups', color: '#F1C232', from: new Date(2013, 10, 18, 12, 0, 0), to: new Date(2013, 10, 21, 18, 0, 0)}
      //   ]},
      //   {name: 'Deployment', tasks: [
      //   {name: 'Depl. & Final testing', color: '#F1C232', from: new Date(2013, 10, 21, 8, 0, 0), to: new Date(2013, 10, 22, 12, 0, 0)}
      //   ]},
      //   {name: 'Workshop', tasks: [
      //   {name: 'On-side education', color: '#F1C232', from: new Date(2013, 10, 24, 9, 0, 0), to: new Date(2013, 10, 25, 15, 0, 0)}
      //   ]},
      //   {name: 'Content', tasks: [
      //   {name: 'Supervise content creation', color: '#F1C232', from: new Date(2013, 10, 26, 9, 0, 0), to: new Date(2013, 10, 29, 16, 0, 0)}
      //   ]},
      //   {name: 'Documentation', tasks: [
      //   {name: 'Technical/User documentation', color: '#F1C232', from: new Date(2013, 10, 26, 8, 0, 0), to: new Date(2013, 10, 28, 18, 0, 0)}
      // ]}];


      $scope.ganttdata = ganttdata;

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