module.exports = function () {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username : {type:String,unique:true},
        password : String,
        firstName : String,
        lastName : String,
        email : String,
        phone : String,
        websites : [String],
        dateCreated : Date
    }, {collection: 'model.user'});

    return UserSchema;
};