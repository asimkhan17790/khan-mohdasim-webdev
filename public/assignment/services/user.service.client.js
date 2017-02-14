(function() {

    angular
        .module("WebAppMaker")
        .factory("UserService",userService);

    function userService () {

        //Dummy Data -- To Be Changed i next assignment when data will be fetch from the server.
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email:"alice@gmail.com"},
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email:"bob.marley@gmail.com"},
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email:"charly@gmail.com" },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email:"jose@gmail.com"}
        ];
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

            var response ={};
            // checking for existing user name

                var userExists = users.find(function (element) {
                    if (element.username === user.username) {
                        //return element;
                        return angular.copy(element);
                    }});
                if (userExists) {
                    response.status="KO";
                    response.description="username already exists";
                    return response;
                }

            //generating unique id
            var uniqueId = (new Date()).getTime();
            user._id=uniqueId.toString();
            users.push(user);
            response.status="OK";
            response.description="User successfully created";
            response.data=uniqueId;
            return response;

        }
        function findUserById(userId) {

            var userFound = users.find(function (element) {
                if (element._id === userId) {
                    //return element;
                    return angular.copy(element);
                }});

            return angular.copy(userFound);
        }
        function findUserByUserName(username) {
            var userFound = users.find(function (element) {
                if (element.username === username) {
                    //return element;
                    return angular.copy(element);
                }});

            return angular.copy(userFound);
        }
        function findUserByCredentials(username,password) {
           var userFound = users.find(function (element) {
               if (element.username === username &&
                   element.password === password) {
                   //return element;
                   return angular.copy(element);
               }
           });

            return angular.copy(userFound);

        }
        function updateUser(userId, newUser) {
            for(var u in users) {
                var user = users[u];
                if( user._id === userId ) {
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    users[u].email = newUser.email;
                    return angular.copy(user);
                }
            }
            return null;
        }
        //todo
        function deleteUser(userId) {
            for(var u in users) {
                var user = users[u];
                if( user._id === userId ) {
                    users.splice(u,1);
                    return "OK";
                }
            }
            return null;
        }
    }

})();