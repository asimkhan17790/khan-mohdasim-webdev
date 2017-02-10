(function() {

    angular
        .module("WebAppMaker")
        .controller("ProfileController",profileController);

    function profileController($routeParams,UserService,$location) {
        var vm = this;


        function init() {
        var uid = $routeParams['uid'];
        vm.user = UserService.findUserById(uid);
        }
        init();


    }
})();