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

            vm.pages = PageService.findPageByWebsiteId(vm.websiteId)
        }
        init();

        function createPage(newPage) {

            if (newPage && newPage.name) {
                //call create Service
                var response = PageService.createPage(vm.websiteId, newPage);
                if (response) {
                    if (response.status === "OK") {
                        vm.success = "Page successfully created";
                        $location.url("/user/" + vm.userId +"/website/"+ vm.websiteId+"/page");
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