(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService($http) {
        this.createWidget = createWidget;
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.rearrangeItems = rearrangeItems;

        function rearrangeItems (pageId, startIndex, endIndex) {
            return $http.put("/api/page/"+pageId+"/widget?ii="+ startIndex + "&fi=" + endIndex);
        }
        function createWidget(pageId,widget) {
            return $http.post("/api/page/"+ pageId +"/widget", widget);
        }
        function findWidgetsByPageId(pageId) {
            return $http.get("/api/page/" + pageId + "/widget");
        }
        function findWidgetById(widgetId) {
            return $http.get("/api/widget/" + widgetId);
        }
        function updateWidget(widgetId, newWidget) {
            return $http.put("/api/widget/" + widgetId, newWidget);

        }
        function deleteWidget (widgetId) {
            return $http.delete("/api/widget/" + widgetId);
        }
    }
})();