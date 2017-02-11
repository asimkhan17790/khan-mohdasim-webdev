(function() {

    angular
        .module("WebAppMaker")
        .controller("ProfileController",profileController);

    function profileController($routeParams, UserService, $location, $timeout) {
        var vm = this;

        vm.update = update;
        var uid = $routeParams['uid'];
        function init() {

        vm.user = UserService.findUserById(uid);
        }
        init();

        function update (newUser) {
            var user = UserService.updateUser(uid, newUser);
            if (user==null) {
                vm.error="unable to update user";
            }else {
                vm.success="User successfully updated";
                $timeout(function () {
                    vm.success = null;
                }, 2000);
            }
        }

    }
})();