(function() {

    angular
        .module("WebAppMaker")
        .controller("PractiseController",PractiseController);


    function PractiseController($location) {


        function init() {

            $("#mydiv").sortable();
            console.log("Hello from practise controller");
        }
        init();

    }
})();