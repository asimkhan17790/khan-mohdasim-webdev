module.exports = function () {

    var api = {
        createPage : createPage,
        findAllPagesForWebsite : findAllPagesForWebsite,
        findPageById : findPageById,
        updatePage : updatePage,
        deletePage : deletePage,
        addWidgetToPage : addWidgetToPage,
        deleteWidgetIdFromPage: deleteWidgetIdFromPage,
        deleteBulkPages : deleteBulkPages
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model('PageModel', PageSchema);


    return api;

    function deleteBulkPages (pages) {
        var deferred = q.defer();
      //  var widgets =[];
        PageModel.find({'_id': {'$in': pages}}, function (err, foundPages) {
            if (err) {
                console.log("Error Occurred");
                deferred.reject();
            }
            else if (foundPages && foundPages.length > 0) {
                var widgets =[];
                foundPages.forEach(
                    function (page) {
                        widgets = widgets.concat(page.widgets);
                        page.remove();
                    }
                );
                deferred.resolve(widgets);
            }
            else {
                deferred.resolve([]);
            }
        });
        //return widgets;
        return deferred.promise;
    }



    function deleteWidgetIdFromPage(pageId, widgetId) {
        var deferred=q.defer();
        PageModel.update({_id: pageId},
            {$pull: {widgets: widgetId}},
            function (err, result) {
                if (err){
                    deferred.reject();
                }
                else {
                    deferred.resolve(result);
                }
            });
        return deferred.promise;
    }


    function addWidgetToPage (pageId , widgetId) {

        var deferred =  q.defer();
        PageModel.findOne({_id : pageId}, function(err, foundPage) {
            if (err){
                console.log("Page not found: " + pageId);
                deferred.reject({status:"KO",
                    description:"Some Error Occurred!!"});

            }
            else if (foundPage){
                foundPage.widgets.push(widgetId);
                foundPage.save(function (err, updatedPage) {
                    if (err) {
                        deferred.reject({status:"KO",
                            description:"Some Error Occurred!!"});
                    }
                    else {
                        deferred.resolve(widgetId);
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

    function createPage (websiteId, page) {

        var deferred = q.defer();
        page._website = websiteId;
        PageModel.findOne({name:page.name,_website:websiteId}, function (err, foundPage) {

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
                            deferred.resolve(createdPage._id);
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
        PageModel.findOneAndRemove({_id:pageId}, function(err, foundPage) {
            if (err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(foundPage);
            }
        });

        return deferred.promise;
    }
};