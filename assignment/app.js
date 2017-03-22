module.exports = function (app) {

    var models = require('./model/model.server')();

    require("./services/user.service.server")(app,models);
    require("./services/website.service.server")(app,models);
    require("./services/page.service.server")(app,models);
    require("./services/widget.service.server")(app,models);
    require("./services/imageupload.service.server")(app);
    require("./services/flickr.service.server")(app);

    console.log("app js started");
}
