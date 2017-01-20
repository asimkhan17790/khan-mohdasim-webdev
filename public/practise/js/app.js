/**
 * Created by Asim on 17-01-2017.
 */

angular.module("TodoApp",[])
    .controller("TodoController", TodoController);

function TodoController ($scope,$http) {
console.log("Hello from controller");
    $scope.hello = 'hello world';
 /*   $scope.todos=[{'title':'Title 1', 'note':'Note 1'},
        {'title':'Title 2', 'note':'Note 2'},
        {'title':'Title 3', 'note':'Note 3'},
        {'title':'Title 4', 'note':'Note 4'}];*/

    $scope.todos=[];
   $http.get('/practise/todo').success(function (res) {
        console.log(res);
       $scope.todos=res;
    });

    $scope.createTodo = createTodo;
    $scope.deleteTodo = deleteTodo;
    $scope.selectTodo = selectTodo;
    $scope.updateTodo = updateTodo;
    $scope.selectedIndex = -1;

    function createTodo(todoData) {
   var temp =  {
      title:todoData.title,
      note:todoData.note
  };
    $scope.todos.push(temp);

    }

    function deleteTodo(todo) {
      var index = $scope.todos.indexOf(todo);
      $scope.todos.splice(index,1);

    }
    function selectTodo(todo) {
        $scope.selectedIndex= $scope.todos.indexOf(todo);
        $scope.todoData ={};
        $scope.todoData.title = todo.title;
        $scope.todoData.note = todo.note;

    }
    function updateTodo (todoData) {
    $scope.todos[$scope.selectedIndex].title=todoData.title;
    $scope.todos[$scope.selectedIndex].note=todoData.note;
    $scope.todoData ={};
    }
}