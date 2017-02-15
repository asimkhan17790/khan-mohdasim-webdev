(function() {

    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", websiteEditController);

    function websiteEditController($routeParams, WebsiteService, $location, $timeout) {

        var vm = this;

        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;
        function init () {
            vm.userId = $routeParams['uid'];
            vm.websiteId = $routeParams['wid'];
            vm.websites = WebsiteService.findWebsiteByUser(vm.userId);
            vm.websiteDisplayed = WebsiteService.findWebsiteById(vm.websiteId);

        }
        init();

        function deleteWebsite () {
            var response = WebsiteService.deleteWebsite(vm.websiteId);
            if (response && response==="OK") {
                vm.success = "Website successfully deleted";
                $location.url("/user/" + vm.userId +"/website");
            }
            else {
                vm.error = "Unable to delete the website";
            }
        }


        function updateWebsite (newWebsite) {

            if ((newWebsite && newWebsite.name)) {
                var response = WebsiteService.updateWebsite(vm.websiteId, newWebsite);
                if (!response) {
                    vm.error="Unable to update Website";
                }else {
                    vm.websites = WebsiteService.findWebsiteByUser(vm.userId);
                    vm.success="Website successfully updated";

                    $timeout(function () {
                        vm.success = null;
                        $location.url("/user/" + vm.userId +"/website");
                    }, 1000);
                }
            }
            else  {
                vm.error = "Please specify a name to the website";
            }
        }

    }
})();