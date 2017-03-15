module.exports = function () {

    var api = {
        createUser : createUser,
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        findUserByCreadentials : findUserByCreadentials,
        updateUser : updateUser,
        deleteUser : deleteUser
    };

    var mongoose = require('mongoose');

    var UserSchema = require('./user.schema.server.js')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    return api;

    function createUser(user) {

        // How to use the Model ???? using save , insert or create ??


        return UserModel.create(user);
    }

    function findUserById(userId) {

    }
    function findUserByUsername(username) {
        return UserModel.findOne({username:username});
    }
    function findUserByCreadentials(username, password) {

    }
    function updateUser(userId, user) {

    }
    function deleteUser(userId) {

    }
};