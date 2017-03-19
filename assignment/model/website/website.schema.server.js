module.exports = function () {
    var mongoose = require('mongoose');

    var WebsiteSchema = mongoose.Schema({
        name : String,
        description : String,
        pages : [{ type: mongoose.Schema.Types.ObjectId, ref: 'PageModel' }],
        _user : { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'model.website'});

    return WebsiteSchema;
};