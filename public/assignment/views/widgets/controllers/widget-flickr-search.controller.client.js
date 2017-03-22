(function() {

    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, FlickrService,DataService,$location) {

        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];

        vm.redirectBack = redirectBack;
        vm.searchPhotos = searchPhotos;
        vm.searchPictures = searchPictures;
        vm.onSelectPhoto = onSelectPhoto;
        vm.addMoreItems = addMoreItems;


        function init () {
        }
        init();
        function onSelectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            /*WidgetService
                .updateWidget(websiteId, pageId, widgetId, {url: url})
                .then(...);*/
            DataService.setData(url);
            redirectBack();

        }

        function redirectBack() {
            if ('NEW' === vm.widgetId) {
                $location.url('/user/'+ vm.userId +'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/new/IMAGE');

            }
            else {
                $location.url('/user/'+ vm.userId +'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/' + vm.widgetId);
            }
        }

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    var data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                    if (vm.photos.photo.length == 0) {
                        vm.error = "No result found";
                    }
                }, function (error) {
                    vm.error = "Some error occurred";
                });
        }
        function searchPictures(searchTerm) {

            FlickrService
                .searchPictures(searchTerm)
                .then(function(response) {
                    //var data = response.data.replace("jsonFlickrApi(","");
                   // data = data.substring(0,data.length - 1);
                   // data = JSON.parse(data);
                    vm.photos = response.data.photos;
                    if (vm.photos.photo.length == 0) {
                        vm.error = "No result found";
                    }
                }, function (error) {
                    vm.error = "Some error occurred";
                });
        }


        function addMoreItems() {
            console.log("hi");
        }



    }
})();