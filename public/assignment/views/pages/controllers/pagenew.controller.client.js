(function() {

    angular
        .module("WebAppMaker")
        .controller("PageNewController", pageNewController);

    function pageNewController($routeParams, PageService, $location) {

        var vm = this;
        vm.createPage = createPage;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        function init () {

            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise.success(function(response) {
                vm.pages = response;
                if (vm.pages.length == 0) {
                    vm.noPage = "No Page to show";
                }
                else {
                    vm.noPage = null;
                }
            });
        }
        init();

        function createPage(newPage) {

            if (newPage && newPage.name) {
                //call create Service

                var promise = PageService.createPage(vm.websiteId, newPage);
                promise.success(function (response) {
                    if (response) {
                        if (response.status === "OK") {
                            vm.success = "Page successfully created";
                            vm.error= null;
                            $location.url("/user/" + vm.userId +"/website/"+ vm.websiteId+"/page");
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