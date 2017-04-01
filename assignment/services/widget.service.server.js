module.exports = function (app,models) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/api/page/:pageId/widget", rearrangeItems);

    var widgetModel = models.WidgetModel;
    var pageModel = models.PageModel;


    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        var response ={};

        widgetModel.createWidget(pageId,widget)

            .then(function (createdWidgetId) {
                return pageModel.addWidgetToPage(pageId, createdWidgetId);
            })
            .then(function (widgetId) {
                 response = {status:"OK",
                    description:"Widget successfully created",
                    data:widgetId};
                res.json(response);
                return;
            },
            function(err) {
                res.json(err);
                return;
            });
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        widgetModel.findAllWidgetsForPage(pageId).then(
            function (widgets) {
                res.json(widgets);
                return;
            },
            function (err) {
                res.sendStatus(500);
            }
        );
    }
    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel.findWidgetById(widgetId).then(
            function (widget) {
                res.json(widget);
                return;
            },
            function (err) {
                res.sendStatus(500);
            }
        );
    }
    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        widgetModel.updateWidget(widgetId,newWidget).then(
            function (widget) {
                res.json(widget);
                return;
            },
            function (err) {
            res.sendStatus(500);
            }
        );
    }

    function deleteWidget(req, res) {/*
        var widgetId = req.params.widgetId;
        widgetModel.deleteWidget(widgetId)
            .then(function () {
                    res.send("OK");
                    return;
                },
                function(err) {
                    res.status(500).send("Some Error Occurred!!");
                    return;
                });*/



        /////

        var widgetId= req.params.widgetId;
        widgetModel.findWidgetById(widgetId)
            .then(function (widget) {
                var pageId=widget._page;
                widgetModel.deleteWidget(widgetId)
                    .then(function () {
                        pageModel.deleteWidgetIdFromPage(pageId, widgetId)
                            .then(function () {
                                res.status(200).send("OK");
                            }, function () {
                                res.status(500).send("Some Error Occurred!!");
                                return;
                            })
                    }, function () {
                        res.status(500).send("Some Error Occurred!!");
                        return;
                    });
            }, function () {
                res.status(500).send("Some Error Occurred!!");
                return;
            });
    }

    function rearrangeItems(req,res) {
        var pageId=req.params.pageId;
        var initial=parseInt(req.query.ii);
        var final=parseInt(req.query.fi);
        widgetModel.reorderWidget(pageId, initial, final)
            .then(function () {
                res.sendStatus(200);
            }, function () {
                res.status(500).send("Some error Occurred!!");
            })


    }
}
