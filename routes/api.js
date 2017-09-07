const express= require('express');
const router = express.Router();
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const mongoURL = 'mongodb://localhost:27017/test_api';
mongoose.createConnection(mongoURL, {
  useMongoClient: true
});
mongoose.Promise = require('bluebird');
const MongoClient = require('mongodb').MongoClient;
// This pulls from the models.
// const models = require("./models/user");
// const User = models.User;

// endpoints in this file are nested under '/api'
router.get('/', function(req, res){
  res.json({ key: "This value is a string" });
})

router.get('/todos', function(req, res){
  res.json([
    {
      item: "Example items in json from class",
      complete: true
    },
    {
      item: "Take a nap",
      complete: false
    },
    {
      item: "Eat some guacamole",
      complete: false
    }
  ]);
});

// My code can be found in the app.js file.
// My code can be found in the app.js file.
// My code can be found in the app.js file.

// router.get('/addEntry', function(req, res) {
//   console.log("addEntry for user");
//   res.render('addEntry');
// });

// router.post('/', function(req, res) {
//   res.redirect('/');
// });

// GET	/activities	Show a list of all activities I am tracking, and links to their individual pages
router.get('/activities', function(req, res){
  res.json([
    {
      item: "activities",
      complete: false
    },
    {
      item: "Eat some guacamole",
      complete: false
    }
  ]);
});

// Create a new activity for me to track.
router.post('/activities', function(req, res){
  res.json([
    {
      item: "post activities",
      complete: false
    },
    {
      item: "Eat some guacamole",
      complete: false
    }
  ]);
});

// Show information about one activity I am tracking, and give me the data I have recorded for that activity.
router.get('/activities/:id', function(req, res){
  res.json([
    {
      item: "get act id",
      complete: false
    },
    {
      item: "Eat some guacamole",
      complete: false
    }
  ]);
});

// Update one activity I am tracking, changing attributes such as name or type. Does not allow for changing tracked data.
router.put('/activities/:id', function(req, res){
  res.json([
    {
      item: "put act id",
      complete: false
    },
    {
      item: "Eat some guacamole",
      complete: false
    }
  ]);
});

// Delete one activity I am tracking. This should remove tracked data for that activity as well.
router.delete('/activities/:id', function(req, res){
  res.json([
    {
      item: "Take a nap",
      complete: false
    },
    {
      item: "Eat some guacamole",
      complete: false
    }
  ]);
});

// Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.
router.post('/activities/:id/stats', function(req, res){
  res.json([
    {
      item: "Take a nap",
      complete: false
    },
    {
      item: "Eat some guacamole",
      complete: false
    }
  ]);
});

// Remove tracked data for a day.
router.delete('/stats/:id', function(req, res){
  res.json([
    {
      item: "Take a nap",
      complete: false
    },
    {
      item: "Eat some guacamole",
      complete: false
    }
  ]);
});









module.exports = router;
