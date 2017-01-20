/**
 * Created by Asim on 17-01-2017.
 */

angular.module("TodoApp",[])
    .controller("TodoController", TodoController);

function TodoController ($scope) {
console.log("Hello from controller");
    $scope.hello = 'hello world';
    $scope.todos=[{'title':'Title 1', 'note':'Note 1'},
        {'title':'Title 2', 'note':'Note 2'},
        {'title':'Title 3', 'note':'Note 3'},
        {'title':'Title 4', 'note':'Note 4'}];
}