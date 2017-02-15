(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($routeParams, WidgetService, $location,$timeout,StaticDataService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.imageWidthOptions = StaticDataService.imageWidthOptions;
        vm.youtubeWidthOptions = StaticDataService.youtubeWidthOptions;
        vm.headerSizeOptions = StaticDataService.headerSizeOptions;


        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.createNewWidget = createNewWidget;
        vm.availableWidgets = StaticDataService.widgetOptions;

        function init() {
            vm.widget = {};
            vm.widget.widgetType = $routeParams['wgtype'];
            if ("YOUTUBE" === vm.widget.widgetType || "IMAGE" === vm.widget.widgetType) {
                vm.widget.width = "100%";
            }
            else if ("HEADER" === vm.widget.widgetType) {
                vm.widget.size = 3;
            }

            vm.headerLabel = StaticDataService.getWidgetTypeLabelName(vm.widget.widgetType);
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widgets/templates/editors/widget-'+type+'-editor.view.client.html';
        }
        function createNewWidget() {
            var response = WidgetService.createWidget(vm.pageId, vm.widget);
            if (response.status==="OK") {
                vm.success="Widget successfully created";

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
                vm.error = "Unable to create widget";
            }
        }
    }
})();