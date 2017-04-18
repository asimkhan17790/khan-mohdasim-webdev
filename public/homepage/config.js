(function() {

    angular
        .module("WebAppHomePage")
        .config(configuration);
    function configuration($routeProvider,$httpProvider) {


        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider
            .when("/", {
                templateUrl:"views/users/templates/webdevHomePage.view.client.html",
                controller:"HomePageController",
                controllerAs:"model",
                data: {
                    pageTitle: 'Asim Khan Home Page',
                }
            })
            .when("/homepage", {
                templateUrl:"views/users/templates/webdevHomePage.view.client.html",
                controller:"HomePageController",
                controllerAs:"model",
                data: {
                    pageTitle: 'Asim Khan Home Page',
                }
            })
            .otherwise({
                redirectTo:"/"
            });
    }
})();