const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mustache = require('mustache-express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/test_api');
const models = require("./models/user");
const User = models.User;
const modelStat = require("./models/stat");
const Stat = modelStat.Stat;

app.use(session({
  secret: 'Auaf4PCUWO',
  resave: false,
  saveUninitialized: true
}))

// add ability to parse URL parameter
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const rootRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');

// view engine setup
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views','./views');

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routers
app.use('/', rootRouter);
app.use('/api', apiRouter);

//get all activities
// Takes the user to the add entry page.
app.get('/activities', function(req, res) {
  console.log("addEntry for user");
  User.find().then(function(user) {
    Stat.find().then(function(stat) {
      res.render('addEntry', {user: user, stat: stat});
    });
  });
});

// This adds a task as a user document.
app.post('/add_task/', function(req, res) {
  console.log("/add_task/");
  console.log(req.body);
  // Adds user to database.
  User.create(req.body).then(function(user) {
    // req.flash("success_msg", "You are registered");
    res.redirect('/');
  });
});

//get stats for a single activity
app.get("/activities/:id", function  (req, res) {
  req.session.activityid = req.params.id;
  console.log("ID: " + req.params.id);
  let x = 1;
  User.findOne({_id: req.params.id}).then(function(user) {
    res.render('addEntry', {user: user});
  });
});

//update activity
app.post("/api/activities/:id", function  (req, res) {
  let activity = req.body.activity;
  let id = req.params.id;
  console.log("Params: "+req.params);
  console.log("ID: "+req.params.id+", Activity: "+activity);
  User.findOneAndUpdate({_id: req.params.id}, {activity: activity}).then(function(user) {
    console.log("updated");
    res.redirect('/activities');
  });
});

//delete activity
app.post("/api/activities/:id/delete", function  (req, res) {
	let id = req.params.id;
  let query = {_id:id};
  console.log("Query: "+query);
  User.remove(query).then(function(user) {
    console.log("deleted");
    res.redirect('/activities');
  });
});

//add stats to activity
app.post("/api/activities/:id/stats", function  (req, res) {
  let id = req.params.id;
  let activity = req.body.activity;
	let amount = req.body.amount;
	let newstat = {"activityId": req.body.activity, "identifier": id, "amount": req.body.amount, "create_date": req.body.date}
  console.log("Params: "+req.params);
  console.log(req.body);
  console.log("ID: "+req.params.id+", Activity: "+req.body.activity+", Amount: "+req.body.amount+", Date: "+req.body.date);
  Stat.create(newstat).then(function(user) {
    console.log("added a stat");
    res.redirect('/activities');
  });
});

//delete stat
app.post("/api/stats/:id", function  (req, res) {
	let id = req.params.id;
  let query = {_id:id};
  console.log("Query: "+query);
  Stat.remove(query).then(function(stat) {
    console.log("deleted stat");
    res.redirect('/activities');
  });
});

//delete stats by date (all stats for a given date are deleted)
app.post("/api/stat/date_delete", function  (req, res) {
	// let id = req.params.id;
  let query = {create_date: req.body.date};
  console.log("date: "+req.body.date);
  Stat.remove(query).then(function(stat) {
    console.log("deleted stat by date");
    res.redirect('/activities');
  });
});


app.listen(3000, function(){
  console.log('Started express application!')
});
