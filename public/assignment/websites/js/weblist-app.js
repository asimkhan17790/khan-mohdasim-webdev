angular
    .module("WebsiteListApp", [])
    .controller("WebsiteListController", WebsiteListController);

function WebsiteListController($scope, $http) {
    $scope.websiteList = [
        {name:'Address Book App', description:'Address Book App Description'},
        {name:'Blogger', description:'Blogger App Description'},
        {name:'Blogging App', description:'Blogging App Description'},
        {name:'Script Testing App', description:'Script Testing App Description'}
    ];


}
