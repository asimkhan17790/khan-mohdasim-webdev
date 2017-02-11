(function() {

    angular
        .module("WebAppMaker")
        .controller("LoginController",loginController);

    function loginController($location, UserService) {
      var vm = this;
      vm.login=login;
      function init() {

        }
      init();
      function login (user) {
          if (user && user.username && user.password) {
              var loginUser = UserService.findUserByCredentials(user.username, user.password);
              if (loginUser) {
                  $location.url("/user/" + loginUser._id);
              }
              else {
                  vm.error = "User not found";
              }
          }
          else {
              vm.error = "username or password field is empty";
          }


        }
    }
})();