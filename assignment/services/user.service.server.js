module.exports = function (app) {
    app.get("/api/user", findUser);
    app.post("/api/user", createUser);
    app.get("/api/user/:userId", findUserByUserId);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);


    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email:"alice@gmail.com"},
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob2",    lastName: "Marley", email:"bob.marley@gmail.com"},
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email:"charly@gmail.com" },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email:"jose@gmail.com"}
    ];

    function deleteUser (req,res) {
        var userId = req.params.userId;
        for(var u in users) {
            var user = users[u];
            if( user._id === userId ) {
                users.splice(u,1);
                return res.send("OK");
            }
        }
        return null;
    }
    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUserName(req, res);
        }
    }

    function createUser(req, res) {

        var response ={};
        // checking for existing user name
        var user = req.body;
        var userExists = users.find(function (element) {
            if (element.username === user.username) {
                return element;
            }});
        if (userExists) {
            response.status="KO";
            response.description="Selected Username already exists";
            res.json(response);
            return;
        }

        //generating unique id
        var uniqueId = (new Date()).getTime();
        user._id=uniqueId.toString();
        users.push(user);
        response.status="OK";
        response.description="User successfully created";
        response.data=uniqueId;
        res.json(response);
        return;
    }
    function findUserByUserId(req, res) {
        var userId = req.params.userId;
        var userFound = users.find(function (element) {
            if (element._id === userId) {
                //return element;
                return element;
            }});

        res.json(userFound);
        return;
    }

    function findUserByUserName(req, res) {
        var username = req.query.username;
        var userFound = users.find(function (element) {
            if (element.username === username) {
                return element;
            }});

        if (userFound) {
            res.json(userFound);
            return;
        } else {
            res.sendStatus(404);
        }

    }

    function findUserByCredentials (req,res) {

        var userFound = users.find(function (element) {
            if (element.username === req.query.username &&
                element.password === req.query.password) {
                //return element;
                return element;
            }
        });
         res.json(userFound);
         return;
}

    function updateUser(req, res) {

        var userId = req.params.userId;
        var newUser = req.body;
        console.log(newUser);
        console.log(newUser['firstName']);
        for(var u in users) {
            var user = users[u];
            if( user._id === userId ) {
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                users[u].email = newUser.email;
                res.json(users[u]);
                return;
            }
        }
        return null;
    }
}
