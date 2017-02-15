(function() {

    angular
        .module("WebAppMaker")
        .controller("PageEditController", pageEditController);

    function pageEditController($routeParams, PageService, $location, $timeout) {

        var vm = this;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        function init () {

            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.pageDisplayed = PageService.findPageById(vm.pageId);

        }
        init();

        function deletePage () {
            var response = PageService.deletePage(vm.pageId);
            if (response && response==="OK") {
                vm.success = "Page successfully deleted";
                $location.url("/user/" + vm.userId +"/website/"+ vm.websiteId+"/page");
            }
            else {
                vm.error = "Unable to delete the Page";
            }
        }


        function updatePage () {

            if ((vm.pageDisplayed && vm.pageDisplayed.name)) {
                var response = PageService.updatePage(vm.pageId, vm.pageDisplayed);
                if (!response) {
                    vm.error="Unable to update Page";
                }else {
                    vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
                    vm.success="Page successfully updated";

                    $timeout(function () {
                        vm.success = null;
                        $location.url("/user/" + vm.userId +"/website/"+ vm.websiteId+"/page");
                    }, 1000);
                }
            }
            else  {
                vm.error = "Please specify a name to the Page";
            }
        }

    }
})();