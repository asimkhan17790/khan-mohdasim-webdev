/**
 * Created by Asim on 17-01-2017.
 */

angular.module("TodoApp",[])
    .controller("TodoController", TodoController);

function TodoController ($scope) {
console.log("Hello from controller");
    $scope.hello = 'hello world';
    $scope.todos=[{'title':'1', 'note':'Note 1'},
        {'title':'2', 'note':'Note 2'},
        {'title':'3', 'note':'Note 3'},
        {'title':'4', 'note':'Note 4'}];
}