module.exports = function () {

    var api = {
        createWidget : createWidget,
        findAllWidgetsForPage : findAllWidgetsForPage,
        findWidgetById : findWidgetById,
        updateWidget : updateWidget,
        deleteWidget : deleteWidget,
        reorderWidget : reorderWidget
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var WidgetSchema = require('./widget.schema.server')();
    var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);
   // var PageModel = require("../page/page.model.server")();

    return api;

    function createWidget (pageId, widget,PageModel) {

        var deferred = q.defer();
        widget._page = pageId;

        WidgetModel.create(widget, function (err, createdWidget) {
            if (err) {
                deferred.reject({status:"KO",
                    description:"Some Error Occurred!!"});
            }
            else {
                PageModel.addWidgetToPage(pageId, createdWidget._id)
                    .then(function (updatedPage) {
                            deferred.resolve(createdWidget._id);
                        },
                        function (err) {
                            deferred.reject(
                                {status:"KO",
                                    description:"Some Error Occurred!!"});
                        });
            }
        });

        return deferred.promise;
    }
    function findAllWidgetsForPage (pageId) {

        var deferred = q.defer();
        WidgetModel.find({_page: pageId}, function (err, widgets) {
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
    function deleteWidget (widgetId) {

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
    }

    function reorderWidget (pageId, start, end) {

    }

};