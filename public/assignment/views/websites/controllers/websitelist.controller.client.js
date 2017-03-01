(function() {

    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", websiteListController);

    function websiteListController($routeParams, WebsiteService, $location) {

        var vm = this;
        function init () {
            vm.userId = $routeParams['uid'];

            var promise = WebsiteService.findWebsiteByUser(vm.userId);
            promise.success(function (response) {
                vm.websites = response;
                if (!vm.websites) {
                    vm.error = "Unable to load websites";
                }
                else if (vm.websites.length == 0) {
                    vm.error = "No websites to show";
                }
                else {
                    vm.error = null;
                }
            })
                .error(function () {
                    vm.error = "Some Error Occurred! Please try again.";
                });
        }
        init();
    }

})();