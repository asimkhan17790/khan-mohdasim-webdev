module.exports = function (app) {
    const https = require('https');
    const querystring = require('querystring');

    var apiKey    = process.env.FLICKR_KEY;
    var secret    = process.env.FLICKR_SECRET;
    //  var apiPrefix = process.env.FLICKR_API_PREFIX;
    var endpoint  = 'https://api.flickr.com/services/rest/?method=METHOD&api_key=API_KEY&format=json&per_page=200';
    var host = 'api.flickr.com';
    var pathTemplate = '/services/rest/?method=METHOD&api_key=API_KEY&format=json&per_page=200';

    endpoint = endpoint.replace('API_KEY', apiKey);
    pathTemplate = pathTemplate.replace('API_KEY', apiKey);

    app.get('/api/widget/image/flickrSearch/:flickrMethod', flickrProxy);

    function flickrProxy(req, res) {
        var flickrMethod = req.params.flickrMethod;
       // var url = endpoint.replace('METHOD', flickrMethod);
        var path = pathTemplate.replace('METHOD', flickrMethod);
        return httpsResponse(req, res, path);
    }

    function httpsResponse(req, res, path) {
       // var query = querystring.stringify(req.query.searchTerm);
        var query = 'text=' + encodeURI(req.query.searchTerm);
        path += '&'+query;
        https.get({
            host: host,
            path: path
        }, function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
                body = body.replace('jsonFlickrApi(', '');
                body = body.substr(0, body.length-1);
                body = JSON.parse(body);
                res.json(body);
            });
        });
    }
};