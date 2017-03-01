module.exports = function (app) {
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserByUserId);
    app.put("/api/user/:userId", updateUser);
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email:"alice@gmail.com"},
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob2",    lastName: "Marley", email:"bob.marley@gmail.com"},
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email:"charly@gmail.com" },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email:"jose@gmail.com"}
    ];


    function findUserByUserId(req, res) {
        var userId = req.params.userId;
        var userFound = users.find(function (element) {
            if (element._id === userId) {
                //return element;
                return element;
            }});

        return res.json(userFound);
    }

     function findUserByCredentials (req,res) {

        var userFound = users.find(function (element) {
            if (element.username === req.query.username &&
                element.password === req.query.password) {
                //return element;
                return element;
            }
        });

        return res.json(userFound);
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



    console.log("app js started");


    //require("./services/user.service.server")(app);
  //  require("./services/website.service.server")(app);
   // require("./services/page.service.server")(app);
   // require("./services/widget.service.server")(app);
}
