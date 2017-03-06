(function() {

    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {

        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
        vm.reArrangeItems = reArrangeItems;


        function init () {
        var promise = WidgetService.findWidgetsByPageId(vm.pageId);
        promise.success(function (response) {
            vm.widgets = response;
            if (vm.widgets.length == 0) {
                vm.error = "No Widgets to display";
            }});
        }
        init();
        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }
        function getWidgetTemplateUrl(widgetType) {
            var url = 'views/widget/templates/widget-'+widgetType+'.view.client.html';
            return url;
        }
        function reArrangeItems(startIndex, endIndex) {

            if (startIndex!=null && endIndex!=null && startIndex>=0 && endIndex>=0) {
                var promise=WidgetService.rearrangeItems(vm.pageId, startIndex, endIndex);
                promise.error(function (){
                        vm.error="Some Error occured while rearanging the items! Please try again";
                    }
                );
            }

        }



    }
})();