angular
    .module("PageListApp", [])
    .controller("PageListController", PageListController)

function PageListController($scope, $http) {
    $scope.pageList = [
        {name:'Blog Posts', description:'Blog posts description'},
        {name:'Blog', description:'Blog Description'},
        {name:'Home', description:'Home Description'},
        {name:'About', description:'About Description'}
    ];


}
