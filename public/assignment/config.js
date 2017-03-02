(function() {

    angular
        .module("WebAppMaker")
        .config(configuration);
    function configuration($routeProvider,$httpProvider) {


        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider
            .when("/", {
                templateUrl:"views/users/templates/login.view.client.html",
                controller:"LoginController",
                controllerAs:"model",
                data: {
                    pageTitle: 'Login User',
                }
            })
            .when("/login", {
                templateUrl:"views/users/templates/login.view.client.html",
                controller:"LoginController",
                controllerAs:"model",
                data: {
                    pageTitle: 'Login User',
                }
            })
            .when("/user/:uid", {
                templateUrl:"views/users/templates/profile.view.client.html",
                controller:"ProfileController",
                controllerAs:"model",
                data: {
                    pageTitle: 'Profile Page',
                }
            })
            .when("/register", {
                templateUrl:"views/users/templates/register.view.client.html",
                controller:"RegisterController",
                controllerAs:"model",
                data: {
                    pageTitle: 'Register User',
                }
            })
            //website
            .when("/user/:uid/website", {
                templateUrl:"views/websites/templates/website-list.view.client.html",
                controller:"WebsiteListController",
                controllerAs:"model",
                data: {
                    pageTitle: 'Website List',
                }
            })
            //new website
            .when("/user/:uid/website/new", {
                templateUrl:"views/websites/templates/website-new.view.client.html",
                controller:"WebsiteNewController",
                controllerAs:"model",
                data: {
                    pageTitle: 'New Website',
                }
            })

            .when("/user/:uid/website/:wid", {
                templateUrl:"views/websites/templates/website-edit.view.client.html",
                controller:"WebsiteEditController",
                controllerAs:"model",
                data: {
                    pageTitle: 'Edit Website',
                }
            })
            // Pages
            .when("/user/:uid/website/:wid/page", {
                templateUrl:"views/pages/templates/page-list.view.client.html",
                controller:"PageListController",
                controllerAs:"model",
                data: {
                    pageTitle: 'Pages',
                }
            })
            // new Page
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl:"views/pages/templates/page-new.view.client.html",
                controller:"PageNewController",
                controllerAs:"model",
                data: {
                    pageTitle: 'New Page',
                }
            })
            // Edit Page
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl:"views/pages/templates/page-edit.view.client.html",
                controller:"PageEditController",
                controllerAs:"model",
                data: {
                    pageTitle: 'Edit Page',
                }
            })
            // Widgets
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl:"views/widgets/templates/widget-list.view.client.html",
                controller:"WidgetListController",
                controllerAs:"model",
                data: {
                    pageTitle: 'Widget List',
                }
            })
           .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl:"views/widgets/templates/widget-chooser.view.client.html",
                controller:"WidgetChooserController",
                controllerAs:"model",
               data: {
                   pageTitle: 'Choose Widget',
               }
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new/:wgtype", {
                templateUrl:"views/widgets/templates/widget-new.view.client.html",
                controller:"WidgetNewController",
                controllerAs:"model",
                data: {
                    pageTitle: 'New Widget',
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl:"views/widgets/templates/widget-edit.view.client.html",
                controller:"WidgetEditController",
                controllerAs:"model",
                data: {
                    pageTitle: 'Edit Widget',
                }
            })
            .otherwise({
                redirectTo:"/login"
            });
    }
})();