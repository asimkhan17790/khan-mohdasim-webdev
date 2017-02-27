(function() {

    angular
        .module("WebAppMaker")
        .config(configuration);
    function configuration($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl:"views/users/templates/login.view.client.html",
                controller:"LoginController",
                controllerAs:"model",
                title:"Login Page"
            })
            .when("/login", {
                templateUrl:"views/users/templates/login.view.client.html",
                controller:"LoginController",
                controllerAs:"model",
                title:"Login Page"
            })
            .when("/user/:uid", {
                templateUrl:"views/users/templates/profile.view.client.html",
                controller:"ProfileController",
                controllerAs:"model"
            })
            .when("/register", {
                templateUrl:"views/users/templates/register.view.client.html",
                controller:"RegisterController",
                controllerAs:"model"
            })
            //website
            .when("/user/:uid/website", {
                templateUrl:"views/websites/templates/website-list.view.client.html",
                controller:"WebsiteListController",
                controllerAs:"model"
            })
            //new website
            .when("/user/:uid/website/new", {
                templateUrl:"views/websites/templates/website-new.view.client.html",
                controller:"WebsiteNewController",
                controllerAs:"model"
            })

            .when("/user/:uid/website/:wid", {
                templateUrl:"views/websites/templates/website-edit.view.client.html",
                controller:"WebsiteEditController",
                controllerAs:"model"
            })
            // Pages
            .when("/user/:uid/website/:wid/page", {
                templateUrl:"views/pages/templates/page-list.view.client.html",
                controller:"PageListController",
                controllerAs:"model"
            })
            // new Page
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl:"views/pages/templates/page-new.view.client.html",
                controller:"PageNewController",
                controllerAs:"model"
            })
            // Edit Page
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl:"views/pages/templates/page-edit.view.client.html",
                controller:"PageEditController",
                controllerAs:"model"
            })
            // Widgets
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl:"views/widgets/templates/widget-list.view.client.html",
                controller:"WidgetListController",
                controllerAs:"model"
            })
           .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl:"views/widgets/templates/widget-chooser.view.client.html",
                controller:"WidgetChooserController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new/:wgtype", {
                templateUrl:"views/widgets/templates/widget-new.view.client.html",
                controller:"WidgetNewController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl:"views/widgets/templates/widget-edit.view.client.html",
                controller:"WidgetEditController",
                controllerAs:"model"
            })
            .otherwise({
                redirectTo:"/login"
            });
    }
})();