module.exports = function (app,models) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websiteModel = models.WebsiteModel;
    var pageModel = models.PageModel;
    var userModel = models.UserModel;
    var widgetModel = models.WidgetModel;
    function createWebsite(req, res) {

        var userId = req.params.userId;
        var website = req.body;
        var response ={};
        websiteModel.createWebsiteForUser(userId,website)

            .then(function (createdWebsiteId) {
                return userModel.addWebsiteToUser(userId, createdWebsiteId);
            })
            .then(function (websiteId) {
                response = {status:"OK",
                    description:"Website successfully created",
                    data:websiteId};
                res.json(response);
                return;
            },
            function(err) {
                res.json(err);
                return;
            });


    }
    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
       // var sites = [];

        websiteModel.findAllWebsitesForUser(userId).then(
            function (websites) {
                res.json(websites);
                return;
            },
            function (err) {
                    res.sendStatus(500);
            }
        );
    }
    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel.findWebsiteById(websiteId).then(
            function (website) {
                res.json(website);
                return;
            },
            function (err) {
                res.sendStatus(500);
            }
        );
    }
    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        websiteModel.updateWebsite(websiteId,newWebsite).then(
            function (website) {
                res.json(website);
                return;
            },
            function (err) {
                res.sendStatus(500);
            }
        );
    }
    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel.deleteWebsite(websiteId)
            .then(function (foundWebsite) {

                    var pages = foundWebsite.pages;
                    var parentUser = foundWebsite._user;

                    pageModel.deleteBulkPages(pages)
                        .then(function (widgets) {
                             return widgetModel.deleteBulkWidgets(widgets);
                        }).then(function () {
                             return userModel.deleteWebsiteFromUser(parentUser, foundWebsite._id);
                         }).then(function () {
                            console.log("All Data Deleted");
                        },
                        function(err) {
                            console.log("Error Occurred" + err);
                        });

                    res.send("OK");
                    return;
                },
                function(err) {
                    res.status(500).send("Some Error Occurred!!");
                    return;
                });
    }
}
