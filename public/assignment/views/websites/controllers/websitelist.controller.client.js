(function() {

    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", websiteListController);

    function websiteListController($routeParams, WebsiteService, $location) {

        var vm = this;
        function init () {
            vm.userId = $routeParams['uid'];
            vm.websites = WebsiteService.findWebsiteByUser(vm.userId);

            if (!vm.websites) {
                vm.error = "Unable to load websites";
            }
            else if (vm.websites.length == 0) {
                vm.error = "No websites to show";
            }

        }
        init();
    }


})();