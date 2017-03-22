module.exports = function () {

    var api = {
        createWidget : createWidget,
        findAllWidgetsForPage : findAllWidgetsForPage,
        findWidgetById : findWidgetById,
        updateWidget : updateWidget,
        deleteWidget : deleteWidget,
        reorderWidget : reorderWidget,
        deleteBulkWidgets : deleteBulkWidgets
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var WidgetSchema = require('./widget.schema.server')();
    var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);
   // var PageModel = require("../page/page.model.server")();

    return api;


    function deleteBulkWidgets (widgets) {
        var deferred = q.defer();
        WidgetModel.remove({'_id': {'$in': widgets}}, function (err, result) {
            if (err) {
                console.log("Bulk widget delete failed");
                deferred.reject();
            }
            else {
                console.log("All widgets deleted");
                deferred.resolve();
            }
        });

        return deferred.promise;
    }

    function createWidget (pageId, widget) {

        var deferred = q.defer();
        widget._page = pageId;

        WidgetModel.findOne({_page: pageId})
            .sort('-orderIndex')
            .exec(function (err, member) {
                if (err){
                    deferred.reject({status:"KO",
                        description:"Some Error Occurred!!"});
                }
                else{
                    if (member){
                        widget.orderIndex = member.orderIndex+1;
                    }
                    else{
                        widget.orderIndex = parseInt(0);
                    }
                    WidgetModel.create(widget, function (err, createdWidget) {
                        if (err) {
                            deferred.reject({status:"KO",
                                description:"Some Error Occurred!!"});
                        }
                        else {
                            deferred.resolve(createdWidget._id);
                        }
                    });
                }


            });
        return deferred.promise;
    }
    function findAllWidgetsForPage (pageId) {

        var deferred = q.defer();
        WidgetModel.find({_page: pageId})
            .sort('orderIndex')
            .exec( function (err, widgets) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(widgets);
            }
        });

        return deferred.promise;
    }
    function findWidgetById (widgetId) {
        var deferred = q.defer();
        WidgetModel.findOne({_id: widgetId}, function (err, widget) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(widget);
            }
        });
        return deferred.promise;
    }
    function updateWidget (widgetId, widget) {
        var deferred =  q.defer();
        WidgetModel.findOne({_id:widgetId}, function(err, foundWidget) {
            if (err){
                deferred.reject(err);
            }
            else if (foundWidget){



                foundWidget.widgetType = widget.widgetType || foundWidget.widgetType;
                foundWidget.name = widget.name || foundWidget.name;
                foundWidget.text = widget.text || foundWidget.text;
                foundWidget.placeholder = widget.placeholder || foundWidget.placeholder;
                foundWidget.description = widget.description || foundWidget.description;
                foundWidget.url = widget.url || foundWidget.url;
                foundWidget.width = widget.width || foundWidget.width;
                foundWidget.height = widget.height || foundWidget.height;
                foundWidget.rows = widget.rows || foundWidget.rows;
                foundWidget.size = widget.size || foundWidget.size;
                foundWidget.wClass = widget.wClass || foundWidget.wClass;
                foundWidget.icon = widget.icon  || foundWidget.icon;
                foundWidget.deletable = widget.deletable || foundWidget.deletable;
                foundWidget.formatted = widget.formatted;

                    foundWidget.save(function (err, updatedPage) {
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
   /* function deleteWidget (widgetId) {

        var deferred =  q.defer();
        WidgetModel.remove({_id:widgetId}, function(err, foundWidget) {
            if (err){
                deferred.reject(err);
            }
            else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }*/



    function deleteWidget (widgetId) {
        var deferred = q.defer();
        WidgetModel.findOne({_id: widgetId},function (err, widget) {
            if (err){
                deferred.reject();
            }
            else{
                var currentWidget= widget.orderIndex;
                var currentPageId = widget._page;
                WidgetModel.remove({_id: widgetId},
                    function (err, resp) {
                        if (err){
                            deferred.reject();
                        }
                        else {
                            WidgetModel.find({_page: currentPageId,
                                    orderIndex: {$gte: currentWidget}},
                                function (err, widgets) {
                                    if(err){
                                        deferred.reject();
                                    }
                                    else if (widgets.length == 0) {
                                        deferred.resolve();
                                    }
                                    else
                                    {
                                        widgets.forEach(function (w) {
                                            var updatedOrder=w.orderIndex -1;
                                            WidgetModel.update({_id: w._id},
                                                {$set: {orderIndex: updatedOrder}},
                                                function (err, resp) {
                                                    if (err){
                                                        deferred.reject();
                                                    }
                                                    else{
                                                        deferred.resolve();
                                                    }
                                                });
                                        })
                                    }
                                });
                        }
                    });
            }
        });
        return deferred.promise;
    }


    function reorderWidget (pageId, start, end) {

        var deferred = q.defer();
        WidgetModel.findOne({_page: pageId, orderIndex: start}, function (err, widget){
            if (err){
                deferred.reject();
            }

            else{
                if(start < end){
                    WidgetModel.find({_page: pageId,
                            $and: [{orderIndex: {$gt: start}}, {orderIndex: {$lte: end}}]},
                        function (err, widgets) {
                            if(err){
                                deferred.reject();
                            }
                            else{
                                widgets.forEach(function (w) {

                                    var updatedOrder=w.orderIndex -1;

                                    WidgetModel.update({_id: w._id},{$set: {orderIndex: updatedOrder}},
                                        function (err, resp) {
                                            if (err){
                                                deferred.reject();
                                            }
                                            else{

                                                deferred.resolve();
                                            }
                                        });
                                })

                                WidgetModel.update({_page: pageId, _id: widget._id},
                                    {$set: {orderIndex: end}},
                                    function (err) {
                                        if (err){
                                            deferred.reject();
                                        }
                                        else{
                                            deferred.resolve();
                                        }
                                    });
                            }
                        });
                }
                else{
                    WidgetModel.find({_page: pageId,
                            $and: [{orderIndex: {$gte: end}}, {orderIndex: {$lt: start}}]},
                        function (err, widgets) {
                            if(err){
                                deferred.reject();
                            }
                            else{
                                widgets.forEach(function (w) {
                                    var updatedOrder=w.orderIndex +1;
                                    WidgetModel.update({_id: w._id},
                                        {$set: {orderIndex: updatedOrder}},
                                        function (err, resp) {
                                            if (err){
                                                deferred.reject();
                                            }
                                            else{
                                                deferred.resolve();
                                            }
                                        });
                                });
                                WidgetModel.update({_page: pageId, _id: widget._id},
                                    {$set: {orderIndex: end}},
                                    function (err) {
                                        if (err){
                                            deferred.reject();
                                        }
                                        else{
                                            deferred.resolve();
                                        }
                                    });
                            }
                        });
                }
            }
        })
        return deferred.promise;
    }


};