module.exports = function () {

    var api = {
        createWebsiteForUser : createWebsiteForUser,
        findAllWebsitesForUser : findAllWebsitesForUser,
        findWebsiteById : findWebsiteById,
        updateWebsite : updateWebsite,
        deleteWebsite : deleteWebsite,
        addPageToWebsite : addPageToWebsite
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var WebsiteSchema = require('./website.schema.server')();
    var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);


    return api;

    function addPageToWebsite(wesbiteId, pageId) {
        var deferred =  q.defer();
        WebsiteModel.findOne({_id:wesbiteId}, function(err, foundWebsite) {
            if (err){
                console.log("user not found: " + wesbiteId);
                deferred.reject(err);

            }
            else if (foundWebsite){
                foundWebsite.pages.push(pageId);
                foundWebsite.save(function (err, updatedWebsite) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(updatedWebsite);
                    }
                });
            }
            else {
                deferred.resolve(null);
            }
        });
        return deferred.promise;
    }


   function createWebsiteForUser (userId, website,UserModel) {

       var deferred = q.defer();
       website._user = userId;
       WebsiteModel.findOne({name:website.name}, function (err, foundWebsite) {

           if (err) {
               deferred.reject(err);
           }
           else
               if (foundWebsite) {

                   deferred.reject({status:"KO",description:"Another website with the same name already exists"});
               }
               else {
                   WebsiteModel.create(website, function (err, createdWebsite) {
                       if (err) {
                           deferred.reject({status:"KO",
                               description:"Some Error Occurred!!"});
                       }
                       else {

                           UserModel.addWebsiteToUser(userId, createdWebsite._id)
                               .then(function (updatedUser) {
                                       deferred.resolve(createdWebsite._id);
                               },
                               function (err) {
                                   deferred.reject(
                                       {status:"KO",
                                       description:"Some Error Occurred!!"});
                               });
                       }
                   });
               }

       });
       return deferred.promise;
   }
    function findAllWebsitesForUser (userId) {

        var deferred = q.defer();
        WebsiteModel.find({_user: userId}, function (err, websites) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(websites);
            }
        });

        return deferred.promise;
    }
    function findWebsiteById (websiteId) {
        var deferred = q.defer();
        WebsiteModel.findOne({_id: websiteId}, function (err, website) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(website);
            }
        });
        return deferred.promise;
    }
        function updateWebsite (websiteId, website) {

        var deferred =  q.defer();
        WebsiteModel.findOne({_id:websiteId}, function(err, foundWebsite) {
            if (err){
                deferred.reject(err);
            }
            else if (foundWebsite){
                foundWebsite.name = website.name;
                foundWebsite.description = website.description;

                foundWebsite.save(function (err, updatedWebsite) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(updatedWebsite);
                    }
                });
            }
            else {
                deferred.resolve(null);
            }
        });

        return deferred.promise;
    }
    function deleteWebsite (websiteId) {

        var deferred =  q.defer();
        WebsiteModel.remove({_id:websiteId}, function(err, foundWebsite) {
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