module.exports = function () {
    var mongoose = require('mongoose');

    var WidgetSchema = mongoose.Schema({
        _page : { type: mongoose.Schema.Types.ObjectId, ref: 'PageModel' },
        widgetType : {type : String, enum : ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
        name : String,
        text: String,
        placeholder : String,
        description : String,
        url : String,
        width : String,
        height : String,
        rows : Number,
        size : Number,
        wClass : String,
        icon : String,
        deletable: Boolean,
        formatted : Boolean,
        orderIndex : Number,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'model.widget'});

    return WidgetSchema;
};