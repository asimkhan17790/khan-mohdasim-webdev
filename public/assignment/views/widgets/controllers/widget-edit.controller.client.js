(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService, $location,$timeout,StaticDataService,Upload,DataService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        vm.imageWidthOptions = StaticDataService.imageWidthOptions;
        vm.youtubeWidthOptions = StaticDataService.youtubeWidthOptions;
        vm.headerSizeOptions = StaticDataService.headerSizeOptions;

        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.uploadImage = uploadImage;
        vm.urlChange = urlChange;
        function init() {

            var promise = WidgetService.findWidgetById(vm.widgetId);
            promise.success(function (response) {
                vm.widget = response;
                var flickrUrl = DataService.getData();
                    if (flickrUrl) {
                        vm.widget.url = flickrUrl;
                        DataService.setData(null);
                    }

                vm.headerLabel = StaticDataService.getWidgetTypeLabelName(vm.widget.widgetType);
            }).error(function () {
                vm.error= "Unable To Load Page";
            });


        }
        init();
        function deleteWidget () {
            var promise = WidgetService.deleteWidget(vm.widgetId);
            promise.success(function (response) {
                if (response) {
                    vm.error = null;
                    $location.url("/user/"
                        +vm.userId
                        +"/website/"
                        +vm.websiteId
                        +"/page/"
                        +vm.pageId
                        +"/widget");
                }
                else {
                    vm.error= "Unable to delete Widget";
                }
            });

        }

// image upload start
        function uploadImage(){ //function to call on form submit
            if (vm.imageForm.file.$valid && vm.file) { //check if from is valid
                vm.upload(vm.file); //call upload function
            }
        }


        vm.upload = function (file) {
            Upload.upload({
                url: '/api/widget/image/upload', //webAPI exposed to upload the file
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){ //validate success
                   // vm.success = 'Success ' + resp.config.data.file.name + 'uploaded.';
                    vm.success = 'Image successfully uploaded.';
                    vm.widget.url = resp.data.fileUrl;
                } else {
                    vm.error = 'An error occurred';
                }
            }, function (resp) { //catch error
                vm.error =  resp.status;
                vm.error =  'Error status: ' + resp.status;
            }, function (evt) {
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
        };

// image upload end

        function getEditorTemplateUrl(type) {
            if (type)
            {
                return 'views/widgets/templates/editors/widget-'+type+'-editor.view.client.html';
            }

        }
        function urlChange(){
            var url = $('#url');
            if (url.val()) {
                $('#uploadFile').attr("required", "false");
            }
            else{
                $('#uploadFile').attr("required", "true");
            }
        }
        function updateWidget() {
            var form = $('#editorForm');
            var urlField=$('#url');
            var imageField=$('#uploadFile');
            if (form[0].checkValidity() || urlField[0].checkValidity()) {
                var promise = WidgetService.updateWidget(vm.widgetId, vm.widget);
                promise.success(function (response) {
                    if (response) {
                        vm.success="Widget successfully updated";
                        vm.error = null;
                        $timeout(function () {
                            vm.success = null;
                            $location.url("/user/"
                                +vm.userId
                                +"/website/"
                                +vm.websiteId
                                +"/page/"
                                +vm.pageId
                                +"/widget");
                        }, 1000);
                    }
                    else {
                        vm.error = "Unable to update selected widget";
                    }
                }).error(function () {
                    vm.error = "Some Error Occurred! Please try again.";
                });

            }
            else {
                vm.error = "Please fill the URL field or upload an image from your system";
            }
        }
    }
})();