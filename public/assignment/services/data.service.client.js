(function () {
    angular
        .module("WebAppMaker")
        .factory("DataService", dataService);

    function dataService() {

        //Dummy Data -- To Be Changed i next assignment when data will be fetch from the server.
        var data = "";

        var api = {
            "setData": setData,
            "getData": getData

        };

        return api;

        //callback functions
        function setData(d) {

            data = d;
        }

        function getData() {
            var returnData = data;
            data = null;
            return returnData;
        }
    }
})();