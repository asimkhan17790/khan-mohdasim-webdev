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
            var form = $('#editorForm');
            if (form[0].checkValidity()) {
                //var response = WidgetService.createWidget(vm.pageId, vm.widget);
                var promise = WidgetService.createWidget(vm.pageId, vm.widget);
                promise.success(function (response) {
                    if (response.status==="OK") {
                        vm.success="Widget successfully created";
                        vm.error=null;
                        $timeout(function () {
                            vm.success = null;
                            $location.url("/user/"
                                +vm.userId
                                +"/website/"
                                +vm.websiteId
                                +"/page/"
                                +vm.pageId
                                +"/widget");
                        }, 500);
                    }
                    else {
                        vm.error = "Unable to create widget";
                    }
                });

            }
            else {
                vm.error = "Please fill highlighted fields correctly";
            }
        }
    }
})();