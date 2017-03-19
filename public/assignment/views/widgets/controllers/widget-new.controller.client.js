(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($routeParams, WidgetService, $location,$timeout,StaticDataService,Upload,DataService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.imageWidthOptions = StaticDataService.imageWidthOptions;
        vm.youtubeWidthOptions = StaticDataService.youtubeWidthOptions;
        vm.headerSizeOptions = StaticDataService.headerSizeOptions;


        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.createNewWidget = createNewWidget;
        vm.uploadImage = uploadImage;
        vm.availableWidgets = StaticDataService.widgetOptions;
        vm.urlChange=urlChange;

        function init() {
            vm.widget = {};
            vm.widget.widgetType = $routeParams['wgtype'];
            if ("YOUTUBE" === vm.widget.widgetType || "IMAGE" === vm.widget.widgetType) {
                vm.widget.width = "100%";
            }
            else if ("HEADER" === vm.widget.widgetType) {
                vm.widget.size = 3;
            }
            if (!vm.widget.url) {
                var flickrUrl = DataService.getData();
                if (flickrUrl) {
                    vm.widget.url = flickrUrl;
                    DataService.setData(null);
                }
            }

           // var url = $('#url');
            if (vm.widget.url) {
                $('#uploadFile').attr("required", false);
            }
            else{
                $('#uploadFile').attr("required",true);
            }

            vm.headerLabel = StaticDataService.getWidgetTypeLabelName(vm.widget.widgetType);
        }
        init();

        function getEditorTemplateUrl(type) {
            if (type)
            {
                return 'views/widgets/templates/editors/widget-'+type+'-editor.view.client.html';
            }
        }
        function createNewWidget() {
            var form = $('#editorForm');
            var urlField=$('#url');
            var imageField=$('#uploadFile');
            if (form[0].checkValidity() || urlField[0].checkValidity()) {
                var promise = WidgetService.createWidget(vm.pageId, vm.widget);
                promise.success(function (response) {
                    if (response.status==="OK") {
                        vm.success="Widget successfully created";
                        vm.error=null;
                        $timeout(function () {
                            vm.success = null;
                            $location.url("/user/"
                                +vm.userId
                                +"/website/"
                                +vm.websiteId
                                +"/page/"
                                +vm.pageId
                                +"/widget");
                        }, 500);
                    }
                    else {
                        vm.error = "Unable to create widget";
                    }
                });

            }
            else {
                vm.error = "Please fill the URL field or upload an image from your system";
            }
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
                    $('#uploadFile').attr("required", false);
                } else {
                    vm.error = 'An error occurred';
                    $('#uploadFile').attr("required", true);
                }
            }, function (resp) { //catch error
                vm.error =  resp.status;
                vm.error =  'Error status: ' + resp.status;
                $('#uploadFile').attr("required", false);
            }, function (evt) {
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
        };
        function urlChange(){
            var url = $('#url');
            if (url.val()) {
                $('#uploadFile').attr("required", false);
            }
            else{
                $('#uploadFile').attr("required",true);
            }
        }

// image upload end
    }
})();