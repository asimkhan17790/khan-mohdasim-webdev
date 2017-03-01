(function() {

    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", websiteNewController);

    function websiteNewController($routeParams, WebsiteService, $location) {

        var vm = this;
        vm.createWebsite = createWebsite;

        function init () {
            vm.userId = $routeParams['uid'];
            var promise = WebsiteService.findWebsiteByUser(vm.userId);
            promise.success(function (response) {
                vm.websites = response;
                if (vm.websites.length == 0) {
                    vm.noWebsite = "No websites to show";
                }
                else {
                    vm.noWebsite = null;
                }
            });
        }
        init();

        function createWebsite(newWebsite) {

            if (newWebsite && newWebsite.name) {
                    //call create Service

                    var promise = WebsiteService.createWebsite(vm.userId, newWebsite);
                    promise.success(function (response) {
                        if (response) {
                            if (response.status === "OK") {
                                vm.success = "Website successfully created";
                                vm.error= null;
                                $location.url("/user/" + vm.userId +"/website");
                            }
                            else {
                                vm.error= response.description;
                            }
                        }
                        else {
                            vm.error= "Some error occurred";
                        }
                    });
            }
            else {
                vm.error = "Please specify a name to the website";
            }
        }
    }
})();