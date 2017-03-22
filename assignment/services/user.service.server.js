module.exports = function (app,models) {
    app.get("/api/user", findUser);
    app.post("/api/user", createUser);
    app.get("/api/user/:userId", findUserByUserId);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);


    var userModel = models.UserModel;
    var websiteModel = models.WebsiteModel;
    var pageModel = models.PageModel;
    var widgetModel = models.WidgetModel;
    function deleteUser (req,res) {
        var userId = req.params.userId;

        userModel.deleteUser(userId)
            .then(function (foundUser) {
                    var websites = foundUser.websites;

                    websiteModel.deleteBulkWebsites(websites)
                        .then(function (pages) {
                             return pageModel.deleteBulkPages(pages);
                        }).then(function (widgets) {
                            return widgetModel.deleteBulkWidgets(widgets);
                    }).then(function () {
                        console.log("All Data Deleted");
                    },
                    function(err) {
                        console.log("Error Occurred" + err);
                    });
                 /*  var pages =  websiteModel.deleteBulkWebsites(websites);
                   var widgets = pageModel.deleteBulkPages(pages);
                    widgetModel.deleteBulkWidgets(widgets);*/

                   // var widgets = pageModel.deleteBulkPages(pages);
                    res.send("OK");
                    return;
                },
                function(err) {
                    //res.sendStatus(500).send("Some Error Occurred!!");
                    //return;
                    return null;
                });

    }
    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUserName(req, res);
        }
    }

    function createUser(req, res) {

        var response ={};
        // checking for existing user name
        var user = req.body;

        userModel.createUser(user).then(function (newUser) {
                response.status="OK";
                response.description="User successfully created";
                response.data=newUser._id;
                res.json(response);
                return;

        },
        function(err) {
            console.log(err);
            response.status="KO";
            if (err.code && err.code ===11000) {
                response.description="Selected Username already exists";
            }
            else {
                response.description="Some Error Occurred!! Please try again";
            }
            res.json(response);
            return;
        });


    }
    function findUserByUserId(req, res) {
        var userId = req.params.userId;
        userModel.findUserById(userId)
            .then(function (foundUser) {
                    res.json(foundUser);
                    return;
                },
                function(err) {
                    res.status(500).send("Some Error Occurred!!");
                    return;
                });

    }

    function findUserByUserName(req, res) {
        var response ={};
        var username = req.query.username;

        userModel.findUserByUsername(username)
            .then(function (foundUser) {
                if (foundUser) {
                    console.log("User found"+foundUser);
                    response.status="OK";
                    response.description="User found";
                    response.data = foundUser;
                    res.json(response);
                    return;
                } else {
                    response.status="KO";
                    response.description="User Not Found";
                    res.json(response);
                    return;
                }

            },
            function(err) {
                res.status(500).send("Some Error Occurred!!");
                return;
            });
    }

    function findUserByCredentials (req,res) {

        var username = req.query.username;
        var password = req.query.password;

        userModel.findUserByCredentials(username, password)
            .then(function (foundUser) {
                    res.json(foundUser);
                    return;
                },
                function(err) {
                    res.status(500).send("Some Error Occurred!!");
                    return;
                });

}

    function updateUser(req, res) {

        var userId = req.params.userId;
        var newUser = req.body;

        userModel.updateUser(userId, newUser)
            .then(function (updatedUser) {
                    res.json(updatedUser);
                    return;
                },
                function(err) {
                    res.status(500).send("Some Error Occurred!!");
                    return;
                });
    }
}
