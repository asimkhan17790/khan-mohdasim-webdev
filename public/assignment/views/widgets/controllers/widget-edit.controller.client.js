(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService, $location,$timeout,StaticDataService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        vm.imageWidthOptions = StaticDataService.imageWidthOptions;
        vm.youtubeWidthOptions = StaticDataService.youtubeWidthOptions;
        vm.headerSizeOptions = StaticDataService.headerSizeOptions;

        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);

            vm.headerLabel = StaticDataService.getWidgetTypeLabelName(vm.widget.widgetType);
        }
        init();
        function deleteWidget () {
            var response = WidgetService.deleteWidget(vm.widgetId);
            if (response) {
                $location.url("/user/"
                    +vm.userId
                    +"/website/"
                    +vm.websiteId
                    +"/page/"
                    +vm.pageId
                    +"/widget");
            }
        }

        function getEditorTemplateUrl(type) {
            return 'views/widgets/templates/editors/widget-'+type+'-editor.view.client.html';
        }
        function updateWidget() {
            var response = WidgetService.updateWidget(vm.widgetId, vm.widget);
            if (response) {
                vm.success="Widget successfully updated";

                $timeout(function () {
                    vm.success = null;
                    $location.url("/user/"
                        +vm.userId
                        +"/website/"
                        +vm.websiteId
                        +"/page/"
                        +vm.pageId
                        +"/widget");
                }, 1000);



            }
            else {
                vm.error = "Unable to update selected widget";
            }
        }
    }
})();