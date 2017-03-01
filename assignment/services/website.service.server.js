module.exports = function (app) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);


    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    function createWebsite(req, res) {

        var userId = req.params.userId;
        var website = req.body;
        var response ={};
        // checking for existing website name

        var websiteExists = websites.find(function (element) {
            if (element.name === website.name) {
                return element;

            }});
        if (websiteExists) {
            response.status="KO";
            response.description="Another website with the same name already exists";
            res.json(response);
            return;
        }

        //generating unique id
        var uniqueId = (new Date()).getTime();
        website._id = uniqueId.toString();
        website.developerId = userId;
        websites.push(website);
        response.status="OK";
        response.description="Website successfully created";
        response.data=uniqueId;
        res.json(response);
        return;
    }
    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        var sites = [];
        for(var w in websites) {
            if(websites[w].developerId === userId) {
                sites.push(websites[w]);
            }
        }
        res.json(sites);
        return;
    }
    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        var websiteFound = websites.find(function (element) {
            if (element._id === websiteId) {
                return element;

            }});
             res.json(websiteFound)
             return;
    }
    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        for(var w in websites) {
            var website = websites[w];
            if( website._id === websiteId) {
                websites[w].name = newWebsite.name;
                websites[w].description = newWebsite.description;
                res.json(website);
                return;
            }
        }
        return null;
    }
    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for(var w in websites) {
            var website = websites[w];
            if(website._id === websiteId) {
                websites.splice(w,1);
                res.send("OK");
            }
        }
        return null;
    }

}
