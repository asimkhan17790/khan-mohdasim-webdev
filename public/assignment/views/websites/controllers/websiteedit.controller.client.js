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
            findWebsites();


            var promise2 = WebsiteService.findWebsiteById(vm.websiteId);
            promise2.success(function (response) {
                vm.websiteDisplayed = response;
            });
        }
        init();

        function findWebsites() {
            var promise = WebsiteService.findWebsiteByUser(vm.userId);
            promise.success(function (response) {
                vm.websites = response;
                if (vm.websites.length == 0) {
                    vm.noWebsite = "No websites to show";
                }
                else {
                    vm.noWebsite = null;
                }
            }).error (function () {
                vm.noWebsite = "Some Error occurred while displaying the website list";
            });
        }

        function deleteWebsite () {
            var promise = WebsiteService.deleteWebsite(vm.websiteId);
            promise.success(function (res) {
                var response = res;
                if (response && response==="OK") {
                    vm.success = "Website successfully deleted";
                    $location.url("/user/" + vm.userId +"/website");
                }
                else {
                    vm.error = "Unable to delete the website";
                }
            }).error (function () {
                vm.error = "Something went wrong!";
            });
        }

        function updateWebsite (newWebsite) {
            if ((newWebsite && newWebsite.name)) {
                var promise = WebsiteService.updateWebsite(vm.websiteId, newWebsite);
                promise.success(function (res) {
                    var response = res;
                    if (!response) {
                        vm.error="Unable to update Website";
                    }else {
                        findWebsites();
                        vm.success="Website successfully updated";
                        vm.error= null;
                        $timeout(function () {
                            vm.success = null;
                            $location.url("/user/" + vm.userId +"/website");
                        }, 1000);
                    }
                }).error (function () {
                    vm.error="Unable to update Website";
                });
            }
            else  {
                vm.error = "Please specify a name to the website";
            }
        }

    }
})();