var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var context = {};
    // If there is no session, go to the main page
    if (!req.session.name) {
        res.locals = context;
        res.render('todo');
    }
    context.name = req.session.name;
    context.toDoCount = req.session.toDo.length || 0;
    context.toDo = req.session.toDo || [];
    console.log(context.toDo);
    res.locals = context;
    res.render('todo-session');

});

router.post('/', function(req, res) {
    var context = {};
    
    console.log(req.body);
    
    if (req.body['name']) {
        console.log("in name");
        req.session.name = req.body.name;
        req.session.toDo = [];
        req.session.curId = 0;
    }

    // If there is no session, go to the main page
    if (!req.session.name) {
        console.log("no session");
        res.locals = context;
        res.render('todo');
    }

    if (req.body['Add Item']) {
        console.log("adding item");
        req.session.toDo.push({"name":req.body.toDoName, "id":req.session.curId});
        req.session.curId++;
    }

    if (req.body['Done']) {
        console.log("Marking done");
        req.session.toDo = req.session.toDo.filter(function(e) {
            return e.id != req.body.id;
        });
    }

    context.name = req.session.name;
    context.toDoCount = req.session.toDo.length;
    context.toDo = req.session.toDo;
    console.log(context.toDo);
    res.locals = context;
    res.render('todo-session');
});

router.get('/counter', function(req, res) {
    var context = {};
    context.count = req.session.count || 0;
    req.session.count = context.count + 1;
    res.locals.count = context.count;
    console.log(context.count);
    res.render('counter');
});

router.post('/counter', function(req, res) {
    var context = {};
    if(req.body.command == "resetCount") {
        req.session.count = 0;
    } else {
        context.err = true;
    }

    context.count = req.session.count || 0;
    req.session.count = context.count + 1;
    res.locals = context;
    res.render('counter');
});

module.exports = router;
