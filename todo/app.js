/**
 * Created by Asim on 20-01-2017.
 */
module.exports = function(app){



    app.get('/hello/:name', function (req,res) {
        res.send('hello world' + req.params.name + 'Age:'+ req.query.age);
    });


    app.get('/practise/todo',function (req,res) {
    console.log("in service");

        var todos=[{'title':'Title 1 server', 'note':'Note 1'},
            {'title':'Title 2 server', 'note':'Note 2'},
            {'title':'Title 3 server', 'note':'Note 3'},
            {'title':'Title 4 server', 'note':'Note 4'}];


        res.send(todos);
    });
};