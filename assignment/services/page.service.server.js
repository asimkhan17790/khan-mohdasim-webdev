module.exports = function (app,models) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var websiteModel = models.WebsiteModel;
    var pageModel = models.PageModel;


    function createPage(req, res) {

        var websiteId = req.params.websiteId;
        var page = req.body;

        // checking for existing page name
        var response ={};
        pageModel.createPage(websiteId,page)

            .then(function (createdPageId) {
                return websiteModel.addPageToWebsite(websiteId, createdPageId);
            })
            .then(function (pageId) {
                response = {status:"OK",
                    description:"Page successfully created",
                    data:pageId};
                res.json(response);
                return;
            },
            function(err) {
                res.json(err);
                return;
            });
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        pageModel.findAllPagesForWebsite(websiteId).then(
            function (pages) {
                res.json(pages);
                return;
            },
            function (err) {
                res.sendStatus(500);
            }
        );
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        pageModel.findPageById(pageId).then(
            function (page) {
                res.json(page);
                return;
            },
            function (err) {
                res.sendStatus(500);
            }
        );
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        pageModel.updatePage(pageId,newPage).then(
            function (page) {
                res.json(page);
                return;
            },
            function (err) {
                res.sendStatus(500);
            }
        );
    }
    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel.deleteWebsite(pageId)
            .then(function () {
                    res.send("OK");
                    return;
                },
                function(err) {
                    res.status(500).send("Some Error Occurred!!");
                    return;
                });
    }
}
