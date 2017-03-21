module.exports = function () {

    var api = {
        createUser : createUser,
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        updateUser : updateUser,
        deleteUser : deleteUser,
        addWebsiteToUser : addWebsiteToUser
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var UserSchema = require('./user.schema.server.js')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    return api;

    function addWebsiteToUser(userId, websiteId) {
         var deferred =  q.defer();
        UserModel.findOne({_id:userId}, function(err, foundUser) {
            if (err){
                console.log("user not found: " + userId);
                    deferred.reject({status:"KO",
                        description:"Some Error Occurred!!"});

            }
            else if (foundUser){
                foundUser.websites.push(websiteId);
                foundUser.save(function (err, updatedUser) {
                    if (err) {
                        deferred.reject({status:"KO",
                            description:"Some Error Occurred!!"});
                    }
                    else {
                        deferred.resolve(websiteId);
                    }
                });
            }
            else {
                deferred.reject({status:"KO",
                    description:"Some Error Occurred!!"});
            }
        });
        return deferred.promise;
    }

    function createUser(user) {

        var deferred = q.defer();
        UserModel.create(user, function (err,createdUser) {
            if (err) {
               // console.log(err)
                deferred.reject(err);
            }
            else {
                deferred.resolve(createdUser);
            }
        });

        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred =  q.defer();
        UserModel.findOne({_id : userId}, function(err, user) {
            if (err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }
    function findUserByUsername(username) {
        var deferred =  q.defer();
        UserModel.findOne({username:username}, function(err, user) {
           if (err){
               deferred.reject(err);
           }
            else {
                 deferred.resolve(user);
           }
        });

        return deferred.promise;
    }
    function findUserByCredentials(username, password) {
        var deferred =  q.defer();
        UserModel.findOne({username:username,password:password}, function(err, user) {
            if (err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }
    function updateUser(userId, user) {

        var deferred =  q.defer();
        UserModel.findOne({_id:userId}, function(err, foundUser) {
            if (err){
                deferred.reject(err);
            }
            else if (foundUser){
                foundUser.username = user.username;
                foundUser.password = user.password;
                foundUser.firstName = user.firstName;
                foundUser.lastName = user.lastName;
                foundUser.email = user.email;
                foundUser.phone = user.phone || foundUser.phone;
                foundUser.save(function (err, updatedUser) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(updatedUser);
                    }
                });
            }
            else {
                deferred.resolve(null);
            }
        });

        return deferred.promise;
    }
    function deleteUser(userId) {
        var deferred =  q.defer();
        UserModel.remove({_id:userId}, function(err, foundUser) {
            if (err){
                deferred.reject(err);
            }
            else {
                deferred.resolve();
            }

        });
        return deferred.promise;
    }
};