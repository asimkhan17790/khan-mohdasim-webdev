(function() {

    angular
        .module("WebAppMaker")
        .controller("ProfileController",profileController);

    function profileController($routeParams, UserService, $location, $timeout) {
        var vm = this;

        vm.update = update;
        vm.deleteUser = deleteUser;
        vm.userId = $routeParams['uid'];
        function init() {

        vm.user = UserService.findUserById(vm.userId);
        }
        init();

        function update (newUser) {
            var user = UserService.updateUser(vm.userId, newUser);
            if (user==null) {
                vm.error="unable to update user";
            }else {
                vm.success="User successfully updated";
                $timeout(function () {
                    vm.success = null;
                }, 2000);
            }
        }

        function deleteUser () {
        var response = UserService.deleteUser(vm.userId);
        if ("OK"===response) {
            $location.url("/login");
        }
        else {
            vm.error="unable to delete Account Account";
        }
        }


    }
})();