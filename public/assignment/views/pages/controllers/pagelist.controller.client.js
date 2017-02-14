(function() {

    angular
        .module("WebAppMaker")
        .controller("PageListController", pageListController);

    function pageListController($routeParams, PageService, $location) {

        var vm = this;
        function init () {
            vm.websiteId = $routeParams['wid'];
            vm.userId = $routeParams['uid'];
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);

            if (!vm.pages) {
                vm.error = "Unable to load Pages";
            }
            else if (vm.pages.length == 0) {
                vm.error = "No Page to show";
            }

        }
        init();
    }


})();