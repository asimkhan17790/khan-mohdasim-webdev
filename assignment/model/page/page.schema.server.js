module.exports = function () {
    var mongoose = require('mongoose');

    var PageSchema = mongoose.Schema({
        name : String,
        title : String,
        description : String,
        _website: { type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel' },
        widgets : [{ type: mongoose.Schema.Types.ObjectId, ref: 'WidgetModel' }],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: 'model.page'});

    return PageSchema;
};