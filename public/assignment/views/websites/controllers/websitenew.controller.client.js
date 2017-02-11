(function() {

    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", websiteNewController);

    function websiteNewController($routeParams, WebsiteService, $location) {

        var vm = this;
        vm.createWebsite = createWebsite;
        function init () {
            vm.userId = $routeParams['uid'];
            vm.websites = WebsiteService.findWebsiteByUser(vm.userId)
        }
        init();

        function createWebsite(newWebsite) {

            if (newWebsite && newWebsite.name) {
                    //call create Service
                    var response = WebsiteService.createWebsite(vm.userId, newWebsite);
                    if (response) {
                        if (response.status === "OK") {
                            vm.success = "Website successfully created";
                            $location.url("/user/" + vm.userId +"/website");
                        }
                        else {
                            vm.error= response.description;
                        }
                    }
                    else {
                        vm.error= "Some error occurred";
                    }
            }
            else {
                vm.error = "Please specify a name to the website";
            }
        }
    }
})();