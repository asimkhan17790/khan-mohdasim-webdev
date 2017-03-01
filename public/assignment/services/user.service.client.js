(function() {

    angular
        .module("WebAppMaker")
        .factory("UserService",userService);

    function userService ($http) {


        var api= {
            "createUser":createUser,
            "findUserById":findUserById,
            "findUserByUserName":findUserByUserName,
            "findUserByCredentials":findUserByCredentials,
            "updateUser":updateUser,
            "deleteUser":deleteUser
        };

        return api;

        //callback functions

        function createUser(user) {
            return $http.post("/api/user", user);

        }
        function findUserById(userId) {

            return $http.get("/api/user/" + userId);
        }
        function findUserByUserName(username) {

            return $http.get("/api/user?username="+username);

          /*  var userFound = users.find(function (element) {
                if (element.username === username) {
                    //return element;
                    return angular.copy(element);
                }});

            return angular.copy(userFound);*/
        }
        function findUserByCredentials(username,password) {

           return $http.get("/api/user?username="+username+"&password="+password);

        }
        function updateUser(userId, newUser) {
           return $http.put("/api/user/"+userId, newUser);
        }

        function deleteUser(userId) {

            return $http.delete("/api/user/"+userId);
        }
    }

})();