module.exports = function (app) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);


    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
        { "_id": "544", "name": "Post 4", "websiteId": "789", "description": "Lorem" },
        { "_id": "545", "name": "Post 5", "websiteId": "789", "description": "Lorem" },
        { "_id": "546", "name": "Post 6", "websiteId": "789", "description": "Lorem" },
        { "_id": "547", "name": "Post 7", "websiteId": "789", "description": "Lorem" }
    ];

    function createPage(req, res) {

        var websiteId = req.params.websiteId;
        var page = req.body;
        var response ={};
        // checking for existing page name

        var pageExists = pages.find(function (element) {
            if (element.name === page.name) {
                return element;
            }});
        if (pageExists) {
            response.status="KO";
            response.description="Another Page with the same name already exists";
            res.json(response);
            return;
        }

        //generating unique id
        var uniqueId = (new Date()).getTime();
        page._id = uniqueId.toString();
        page.websiteId = websiteId;
        pages.push(page);
        response.status = "OK";
        response.description = "Page successfully created";
        response.data = uniqueId;
        res.json(response);
        return;

    }
    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var foundPages = [];
        for(var p in pages) {
            if(pages[p].websiteId === websiteId) {
                foundPages.push(pages[p]);
            }
        }
        res.json(foundPages);
        return;
    }
    function findPageById(req, res) {
        var pageId = req.params.pageId;
        var pageFound = pages.find(function (element) {
            if (element._id === pageId) {
                return element;
            }});
        res.json(pageFound);
        return;
    }
    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        for(var w in pages) {
            var page = pages[w];
            if( page._id === pageId) {
                pages[w].name = newPage.name;
                pages[w].description = newPage.description;
                res.json(page);
                return;
            }
        }
        return null;
    }
    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for(var p in pages) {
            var page = pages[p];
            if(page._id === pageId) {
                pages.splice(p,1);
                return res.send("OK");
            }
        }
        return null;
    }
}
