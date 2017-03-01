(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService",pageService);

    function pageService ($http) {

        //Dummy Data -- To Be Changed i next assignment when data will be fetch from the server.


        var api = {
            "createPage":createPage,
            "findPageByWebsiteId":findPageByWebsiteId,
            "findPageById":findPageById,
            "updatePage":updatePage,
            "deletePage":deletePage
        };

        return api;

        //callback functions
        function createPage (websiteId,page) {

            return $http.post("/api/website/" + websiteId +"/page", page);
        }
        function findPageByWebsiteId(websiteId) {
            return $http.get("/api/website/" + websiteId + "/page");
        }
        function findPageById (pageId) {
            return $http.get("/api/page/" + pageId);
        }
        function updatePage(pageId, newPage){
            return $http.put("/api/page/"+pageId, newPage);
        }
        function deletePage (pageId) {
            return $http.delete("/api/page/" + pageId);
        }
    }
})();