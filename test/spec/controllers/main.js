'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('timelineApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.todos.length).toBe(0);
  });

  it('Should add an item to the list', function(){
    scope.todo = 'test 1';
    scope.addTodo();
    expect(scope.todos.length).toBe(1);
  });

  it('Should add then remove an item from the list', function(){
    scope.todo = 'test 1';
    scope.addTodo();
    scope.removeTodo();
    expect(scope.todos.length).toBe(0);
  });
});
