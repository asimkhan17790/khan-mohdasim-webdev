(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService",pageService);

    function pageService () {

        //Dummy Data -- To Be Changed i next assignment when data will be fetch from the server.
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
            { "_id": "544", "name": "Post 4", "websiteId": "789", "description": "Lorem" },
            { "_id": "545", "name": "Post 5", "websiteId": "789", "description": "Lorem" },
            { "_id": "546", "name": "Post 6", "websiteId": "789", "description": "Lorem" },
            { "_id": "547", "name": "Post 7", "websiteId": "789", "description": "Lorem" }
        ];

        var api= {
            "createPage":createPage,
            "findPageByWebsiteId":findPageByWebsiteId,
            "findPageById":findPageById,
            "updatePage":updatePage,
            "deletePage":deletePage
        };

        return api;

        //callback functions
        function createPage (websiteId,page) {

            var response ={};
            // checking for existing page name

            var pageExists = pages.find(function (element) {
                if (element.name === page.name) {
                    return angular.copy(element);
                }});
            if (pageExists) {
                response.status="KO";
                response.description="Another Page with the same name already exists";
                return response;
            }

            //generating unique id
            var uniqueId = (new Date()).getTime();
            page._id = uniqueId.toString();
            page.websiteId = websiteId;
            pages.push(page);
            response.status = "OK";
            response.description = "Page successfully created";
            response.data = uniqueId;
            return response;

        }
        function findPageByWebsiteId(websiteId) {
            var foundPages = [];
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    foundPages.push(pages[p]);
                }
            }
            return angular.copy(foundPages);
        }
        function findPageById (pageId) {
            var pageFound = pages.find(function (element) {
                if (element._id === pageId) {
                    return angular.copy(element);
                }});
            return pageFound;
        }
        function updatePage(pageId, newPage){
            for(var w in pages) {
                var page = pages[w];
                if( page._id === pageId) {
                    pages[w].name = newPage.name;
                    pages[w].description = newPage.description;
                    return angular.copy(page);
                }
            }
            return null;
        }
        function deletePage (pageId) {
            for(var p in pages) {
                var page = pages[p];
                if(page._id === pageId) {
                    pages.splice(p,1);
                    return "OK";
                }
            }
            return null;
        }

    }

})();