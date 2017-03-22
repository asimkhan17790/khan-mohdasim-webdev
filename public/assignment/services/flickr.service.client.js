(function() {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", flickerService);

    function flickerService ($http) {
       // var key = "your-flickr-key";
     //   var secret = "your-flickr-secret";
       // var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT&per_page=200";

         var api = {
            "searchPhotos" : searchPhotos,
             "searchPictures" : searchPictures
        };

        return api;

        //callback functions
        function searchPhotos (searchTerm) {

            var url = urlBase.replace("API_KEY", "889490964de61a169e8a4e7ecd78ecf4").replace("TEXT", searchTerm);
            return $http.get(url);

        }

        function searchPictures (searchTerm) {

           // var url = urlBase.replace("API_KEY", "889490964de61a169e8a4e7ecd78ecf4").replace("TEXT", searchTerm);
            return $http.get("/api/widget/image/flickrSearch/flickr.photos.search?searchTerm="+searchTerm);

        }

    }
})();