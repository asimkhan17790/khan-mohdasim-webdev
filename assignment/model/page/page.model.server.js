module.exports = function () {

    var api = {
        createPage : createPage,
        findAllPagesForWebsite : findAllPagesForWebsite,
        findPageById : findPageById,
        updatePage : updatePage,
        deletePage : deletePage,
        addWidgetToPage : addWidgetToPage
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model('PageModel', PageSchema);


    return api;

    function addWidgetToPage (pageId , widgetId) {

        var deferred =  q.defer();
        PageModel.findOne({_id : pageId}, function(err, foundPage) {
            if (err){
                console.log("user not found: " + pageId);
                deferred.reject(err);

            }
            else if (foundPage){
                foundPage.widgets.push(widgetId);
                foundPage.save(function (err, updatedPage) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(updatedPage);
                    }
                });
            }
            else {
                deferred.resolve(null);
            }
        });
        return deferred.promise;
    }

    function createPage (websiteId, page, WebsiteModel) {

        var deferred = q.defer();
        page._website = websiteId;
        PageModel.findOne({name:page.name}, function (err, foundPage) {

            if (err) {
                deferred.reject(err);
            }
            else
            if (foundPage) {
                deferred.reject({status:"KO",
                                description:"Another Page with the same name already exists"});
            }
            else {
                PageModel.create(page, function (err, createdPage) {
                    if (err) {
                        deferred.reject({status:"KO",
                            description:"Some Error Occurred!!"});
                    }
                    else {
                        WebsiteModel.addPageToWebsite(websiteId, createdPage._id)
                            .then(function (updatedWebsite) {
                                    deferred.resolve(createdPage._id);
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

    function findAllPagesForWebsite (websiteId) {


        var deferred = q.defer();
        PageModel.find({_website: websiteId}, function (err, pages) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(pages);
            }
        });

        return deferred.promise;
    }
    function findPageById (pageId) {

        var deferred = q.defer();
        PageModel.findOne({_id: pageId}, function (err, page) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(page);
            }
        });
        return deferred.promise;
    }
    function updatePage (pageId, page) {


        var deferred =  q.defer();
        PageModel.findOne({_id:pageId}, function(err, foundPage) {
            if (err){
                deferred.reject(err);
            }
            else if (foundPage){
                foundPage.name = page.name;
                foundPage.description = page.description;
                foundPage.title = page.title;

                foundPage.save(function (err, updatedPage) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(updatedPage);
                    }
                });
            }
            else {
                deferred.resolve(null);
            }
        });

        return deferred.promise;
    }

    function deletePage (pageId) {

        var deferred =  q.defer();
        PageModel.remove({_id:pageId}, function(err, foundPage) {
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