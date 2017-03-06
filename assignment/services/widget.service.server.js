module.exports = function (app) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/api/page/:pageId/widget", rearrangeItems);


    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "124", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "125", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "https://i.ytimg.com/vi/_JLdUs-WqSw/maxresdefault.jpg"},
        { "_id": "126", "widgetType": "HTML", "pageId": "321", "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'},
        { "_id": "127", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "128", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/3AtDnEC4zak" },
        { "_id": "129", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}


        ,{ "_id": "130", "widgetType": "HEADER", "pageId": "547", "size": 2, "text": "GIZMODO"},
        { "_id": "131", "widgetType": "HEADER", "pageId": "547", "size": 4, "text": "Lorem ipsum"},
        { "_id": "132", "widgetType": "IMAGE", "pageId": "547", "width": "100%",
            "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg"},
        { "_id": "133", "widgetType": "HTML", "pageId": "547", "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'},
        { "_id": "134", "widgetType": "HEADER", "pageId": "547", "size": 4, "text": "Lorem ipsum"},
        { "_id": "135", "widgetType": "YOUTUBE", "pageId": "547", "width": "100%",
            "url": "https://youtu.be/3AtDnEC4zak" },
        { "_id": "136", "widgetType": "HTML", "pageId": "547", "text": "<p>Lorem ipsum</p>"},

        { "_id": "137", "widgetType": "HEADER", "pageId": "546", "size": 2, "text": "GIZMODO"},
        { "_id": "138", "widgetType": "HEADER", "pageId": "546", "size": 4, "text": "Lorem ipsum"},
        { "_id": "139", "widgetType": "IMAGE", "pageId": "546", "width": "100%",
            "url": "https://i.ytimg.com/vi/_JLdUs-WqSw/maxresdefault.jpg"},
        { "_id": "140", "widgetType": "HTML", "pageId": "546", "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'},
        { "_id": "141", "widgetType": "HEADER", "pageId": "546", "size": 4, "text": "Lorem ipsum"},
        { "_id": "142", "widgetType": "YOUTUBE", "pageId": "546", "width": "100%",
            "url": "https://youtu.be/3AtDnEC4zak" },
        { "_id": "143", "widgetType": "HTML", "pageId": "546", "text": "<p>Lorem ipsum</p>"},

        { "_id": "144", "widgetType": "HEADER", "pageId": "545", "size": 2, "text": "GIZMODO"},
        { "_id": "145", "widgetType": "HEADER", "pageId": "545", "size": 4, "text": "Lorem ipsum"},
        { "_id": "146", "widgetType": "IMAGE", "pageId": "545", "width": "100%",
            "url": "https://i.ytimg.com/vi/_JLdUs-WqSw/maxresdefault.jpg"},
        { "_id": "147", "widgetType": "HTML", "pageId": "545", "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'},
        { "_id": "148", "widgetType": "HEADER", "pageId": "545", "size": 4, "text": "Lorem ipsum"},
        { "_id": "149", "widgetType": "YOUTUBE", "pageId": "545", "width": "100%",
            "url": "https://youtu.be/3AtDnEC4zak" },
        { "_id": "150", "widgetType": "HTML", "pageId": "545", "text": "<p>Lorem ipsum</p>"},

        { "_id": "151", "widgetType": "HEADER", "pageId": "544", "size": 2, "text": "GIZMODO"},
        { "_id": "152", "widgetType": "HEADER", "pageId": "544", "size": 4, "text": "Lorem ipsum"},
        { "_id": "153", "widgetType": "IMAGE", "pageId": "544", "width": "100%",
            "url": "https://i.ytimg.com/vi/_JLdUs-WqSw/maxresdefault.jpg"},
        { "_id": "154", "widgetType": "HTML", "pageId": "544", "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'},
        { "_id": "155", "widgetType": "HEADER", "pageId": "544", "size": 4, "text": "Lorem ipsum"},
        { "_id": "156", "widgetType": "YOUTUBE", "pageId": "544", "width": "100%",
            "url": "https://youtu.be/3AtDnEC4zak" },
        { "_id": "157", "widgetType": "HTML", "pageId": "544", "text": "<p>Lorem ipsum</p>"},
        { "_id": "158", "widgetType": "HEADER", "pageId": "543", "size": 2, "text": "GIZMODO"},
        { "_id": "159", "widgetType": "HEADER", "pageId": "543", "size": 4, "text": "Lorem ipsum"},
        { "_id": "160", "widgetType": "IMAGE", "pageId": "543", "width": "100%",
            "url": "https://i.ytimg.com/vi/_JLdUs-WqSw/maxresdefault.jpg"},
        { "_id": "161", "widgetType": "HTML", "pageId": "543", "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'},
        { "_id": "162", "widgetType": "HEADER", "pageId": "543", "size": 4, "text": "Lorem ipsum"},
        { "_id": "163", "widgetType": "YOUTUBE", "pageId": "543", "width": "100%",
            "url": "https://youtu.be/3AtDnEC4zak" },
        { "_id": "164", "widgetType": "HTML", "pageId": "543", "text": "<p>Lorem ipsum</p>"},
        { "_id": "165", "widgetType": "HEADER", "pageId": "432", "size": 2, "text": "GIZMODO"},
        { "_id": "166", "widgetType": "HEADER", "pageId": "432", "size": 4, "text": "Lorem ipsum"},
        { "_id": "167", "widgetType": "IMAGE", "pageId": "432", "width": "100%",
            "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg"},
        { "_id": "168", "widgetType": "HTML", "pageId": "432", "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'},
        { "_id": "169", "widgetType": "HEADER", "pageId": "432", "size": 4, "text": "Lorem ipsum"},
        { "_id": "170", "widgetType": "YOUTUBE", "pageId": "432", "width": "100%",
            "url": "https://youtu.be/3AtDnEC4zak" },
        { "_id": "171", "widgetType": "HTML", "pageId": "432", "text": "<p>Lorem ipsum</p>"}
    ];


    function createWidget(req, res) {

        var pageId = req.params.pageId;
        var widget = req.body;
        var response ={};
        var uniqueId = (new Date()).getTime().toString();
        widget._id = uniqueId.toString();
        widget.pageId = pageId;
        widgets.push(widget);
        response.status = "OK";
        response.description = "Widget successfully created";
        response.data = uniqueId;
        res.json(response);
        return;
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var foundWidgets = [];
        for(var p in widgets) {
            if(widgets[p].pageId === pageId) {
                foundWidgets.push(widgets[p]);
            }
        }
        res.json(foundWidgets);
        return;
    }
    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                res.json(widgets[w]);
                return;
            }
        }
        res.send(null);
        return;
    }
    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        for(var u in widgets) {
            if( widgets[u]._id === widgetId) {
                widgets[u] = newWidget;
                res.json(widgets[u]);
                return;
            }
        }
        res.send(null);
        return;
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for(var w in widgets) {
            var widget = widgets[w];
            if(widget._id === widgetId) {
                widgets.splice(w,1);
                res.send("OK");
                return;
            }
        }
        res.send(null);
        return;
    }

    function rearrangeItems(req,res) {
        var pageId=req.params.pageId;
        var initial=req.query.ii;
        var final=req.query.fi;
        var widget=null;
        for (var w in widgets)        {
            if (widgets[w].pageId == pageId){
                if ( w == initial){
                    widget = widgets[w];
                    widgets.splice(w,1);
                    widgets.splice(final, 0, widget);
                    res.sendStatus(200);
                    return;
                }
            }
        }
        res.sendStatus(500).status("Some error Occurred!!");
    }
}
