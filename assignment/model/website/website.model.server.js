module.exports = function () {

    var api = {
        createWebsiteForUser : createWebsiteForUser,
        findAllWebsitesForUser : findAllWebsitesForUser,
        findWebsiteById : findWebsiteById,
        updateWebsite : updateWebsite,
        deleteWebsite : deleteWebsite,
        addPageToWebsite : addPageToWebsite,
        deleteBulkWebsites : deleteBulkWebsites,
        deletePageFromWebsite : deletePageFromWebsite
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var WebsiteSchema = require('./website.schema.server')();
    var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);


    return api;


    function deletePageFromWebsite (websiteId, pageId) {

        var deferred =  q.defer();
        WebsiteModel.findOne({_id:websiteId}, function(err, foundWebsite) {
            if (err){
                console.log("website not found: " + websiteId);
                deferred.reject();

            }
            else if (foundWebsite){
                foundWebsite.pages.pull(pageId);
                foundWebsite.save(function (err, updatedWebsite) {
                    if (err) {
                        deferred.reject();
                    }
                    else {
                        deferred.resolve();
                    }
                });
            }
            else {
                deferred.reject();
            }
        });
        return deferred.promise;
    }


    function deleteBulkWebsites (websites) {

       var deferred =  q.defer();
        WebsiteModel.find({'_id': {'$in': websites}}, function (err, foundWebsites) {
                if (err) {
                    console.log("Error Occurred");
                    deferred.reject();
                }
                else if (foundWebsites && foundWebsites.length > 0)  {
                    var pages = [];
                    foundWebsites.forEach(
                        function (website) {
                            pages = pages.concat(website.pages);
                            website.remove();
                        }
                    );
                   // WebsiteModel.remove({'_id': {'$in': websites}}).exec();
                    //foundWebsites.remove();
                    deferred.resolve(pages);
                }
                else {
                    deferred.resolve([]);
                }

        });
        //return pages;
        return deferred.promise;
    }

    function addPageToWebsite(wesbiteId, pageId) {
        var deferred =  q.defer();
        WebsiteModel.findOne({_id:wesbiteId}, function(err, foundWebsite) {
            if (err){
                console.log("website not found: " + wesbiteId);
                deferred.reject({status:"KO",
                    description:"Some Error Occurred!!"});

            }
            else if (foundWebsite){
                foundWebsite.pages.push(pageId);
                foundWebsite.save(function (err, updatedWebsite) {
                    if (err) {
                        deferred.reject({status:"KO",
                            description:"Some Error Occurred!!"});
                    }
                    else {
                        deferred.resolve(pageId);
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


   function createWebsiteForUser (userId, website) {

       var deferred = q.defer();
       website._user = userId;
       WebsiteModel.findOne({name:website.name,_user:userId}, function (err, foundWebsite) {

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
                           deferred.resolve(createdWebsite._id);
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
        WebsiteModel.findOneAndRemove({_id:websiteId}, function(err, foundWebsite) {
            if (err){
                deferred.reject(err);
            }
            else {
                console.log(foundWebsite._id);
                console.log(foundWebsite.pages);
                deferred.resolve(foundWebsite);
            }
        });

        return deferred.promise;

    }

};