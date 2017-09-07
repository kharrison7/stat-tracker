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

// Takes the user to the add entry page.
app.get('/addEntry', function(req, res) {
  console.log("addEntry for user");
  // res.render('addEntry');
  User.find().then(function(user) {
    res.render('addEntry', {user: user});
  });
});

app.post('/add_task/', function(req, res) {
  console.log("/add_task/");
  console.log(req.body);
  // Adds user to database.
  User.create(req.body).then(function(user) {
    // req.flash("success_msg", "You are registered");
    res.redirect('/');
  });
});

app.listen(3000, function(){
  console.log('Started express application!')
});
