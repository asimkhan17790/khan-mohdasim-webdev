(function() {

    angular
        .module("WebAppMaker")
        .controller("RegisterController",registerController);

    function registerController($location, UserService) {
        var vm = this;
        vm.register = register;

        function init() {

        }
        init();
        function register(user) {
            if (user && user.username && user.password && user.cnfPassword) {
                if (user.password === user.cnfPassword) {
                    //call create Service
                    var response = UserService.createUser(user);
                    if (response) {
                        if (response.status === "OK") {
                            $location.url("/user/" + response.data);
                        }
                        else {
                            vm.error= response.description;
                        }
                    }
                    else {
                        vm.error= "Some error occured";
                    }
                }
                else {
                    vm.error= "Passwords do not match";
                }
            }
            else {
                vm.error = "Field missing";
            }

        }
    }
})();