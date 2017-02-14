(function() {

    angular
        .module("WebAppMaker")
        .factory("WebsiteService",websiteService);

    function websiteService () {

        //Dummy Data -- To Be Changed i next assignment when data will be fetch from the server.
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api= {
            "createWebsite":createWebsite,
            "findWebsiteByUser":findWebsiteByUser,
            "findWebsiteById":findWebsiteById,
            "updateWebsite":updateWebsite,
            "deleteWebsite":deleteWebsite
        };

        return api;

        //callback functions
        function createWebsite (userId,website) {

            var response ={};
            // checking for existing website name

            var websiteExists = websites.find(function (element) {
                if (element.name === website.name) {
                    //return element;
                    return angular.copy(element);
                }});
            if (websiteExists) {
                response.status="KO";
                response.description="Another website with the same name already exists";
                return response;
            }

            //generating unique id
            var uniqueId = (new Date()).getTime();
            website._id = uniqueId.toString();
            website.developerId = userId;
            websites.push(website);
            response.status="OK";
            response.description="Website successfully created";
            response.data=uniqueId;
            return response;

        }
        function findWebsiteByUser (userId) {
            var sites = [];
            for(var w in websites) {
                if(websites[w].developerId === userId) {
                    sites.push(websites[w]);
                }
            }
            return angular.copy(sites);
        }
        function findWebsiteById (websiteId) {
            var websiteFound = websites.find(function (element) {
                if (element._id === websiteId) {
                    //return element;
                    return angular.copy(element);
                }});
                return angular.copy(websiteFound);
        }
        function updateWebsite (websiteId, newWebsite){
            for(var w in websites) {
                var website = websites[w];
                if( website._id === websiteId) {
                    websites[w].name = newWebsite.name;
                    websites[w].description = newWebsite.description;
                    return angular.copy(website);
                }
            }
           return null;
        }
        function deleteWebsite (websiteId) {
            for(var w in websites) {
                var website = websites[w];
                if(website._id === websiteId) {
                    websites.splice(w,1);
                    return "OK";
                }
            }
            return null;
        }

    }

})();