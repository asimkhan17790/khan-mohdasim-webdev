(function() {

    angular
        .module("WebAppMaker")
        /*.run(['$location', '$rootScope', function($location, $rootScope) {
            $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {

                if (current.hasOwnProperty('$$route')) {
                    $rootScope.title = current.$$route.title;
                }
            });
        }])*/
        .controller("LoginController",loginController);


    function loginController($location, UserService) {
      var vm = this;
      vm.login=login;
      function init() {

        }
      init();
      function login (user) {
          if (user && user.username && user.password) {
              var promise = UserService.findUserByCredentials(user.username, user.password);
              promise.success(function (loginUser) {
                  if (loginUser) {
                      $location.url("/user/" + loginUser._id);
                  }
                  else {
                      vm.error = "Username or password is incorrect";
                  }
              })
                  .error(function () {
                      vm.error = "Some error Occurred!! Please try again";
                  });

          }
          else {
              vm.error = "username or password field is empty";
          }


        }
    }
})();