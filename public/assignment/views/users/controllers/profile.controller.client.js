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

       // vm.user = UserService.findUserById(vm.userId);
            var promise = UserService.findUserById(vm.userId);
            promise.success (function (result) {
                vm.user = result;
            });
        }
        init();

        function update (newUser) {
            var emailField = $('#email');
            if (emailField[0].checkValidity()) {
                UserService
                    .updateUser(vm.userId, newUser)
                    .success(function (returnedUser) {
                        if (returnedUser==null) {
                            vm.error="Unable to update user";
                        }else {
                            vm.error=null;
                            vm.success="User successfully updated";
                            $timeout(function () {
                                vm.success = null;
                            }, 2000);
                        }
                });

            }
            else {
                vm.error = "Invalid Email";
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