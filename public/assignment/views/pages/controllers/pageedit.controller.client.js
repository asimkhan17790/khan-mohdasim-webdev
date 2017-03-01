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

            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise.success(function (response) {
                vm.pages = response;
            });

            var promise2 = PageService.findPageById(vm.pageId);
            promise2.success(function (response) {
                vm.pageDisplayed = response;
            });
        }
        init();

        function deletePage () {
            var promise = PageService.deletePage(vm.pageId);
            promise.success(function(response) {
                if (response && response === "OK") {
                    vm.success = "Page successfully deleted";
                    $location.url("/user/" + vm.userId +"/website/"+ vm.websiteId+"/page");
                }
                else {
                    vm.error = "Unable to delete the Page";
                }
            });
         }


        function updatePage () {

            if ((vm.pageDisplayed && vm.pageDisplayed.name)) {
                var promise = PageService.updatePage(vm.pageId, vm.pageDisplayed);
                promise.success(function (response) {
                if (!response) {
                    vm.error="Unable to update Page";
                }else {

                        PageService.findPageByWebsiteId(vm.websiteId)
                            .success(function (response) {
                                 vm.pages = response;
                            });

                    vm.success="Page Successfully Updated";
                    vm.error=null;
                    $timeout(function () {
                        vm.success = null;
                        $location.url("/user/" + vm.userId +"/website/"+ vm.websiteId+"/page");
                    }, 1000);
                }});
            }
            else  {
                vm.error = "Please specify a name to the Page";
            }
        }
    }
})();