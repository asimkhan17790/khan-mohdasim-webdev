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
            })
                .error(function () {
                    vm.error = "Some Error Occurred!! Please try again!";
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
                })
                    .error(function () {
                        vm.error = "Some Error Occurred!! Please try again!"
                    });

            }
            else {
                vm.error = "Invalid Email";
            }

        }

        function deleteUser () {
        var promise = UserService.deleteUser(vm.userId);
        promise.success (function (response) {
            if ("OK"===response) {
                $location.url("/login");
            }
            else {
                vm.error="unable to delete Account Account";
            }
        }).error(function () {
            vm.error = "Some error occurred while deleting User! Please try again."
        });

        }
    }
})();