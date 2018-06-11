//app.js

var express = require('express');
var path = require('path');
var url = require('url');
var bodyparser = require('body-parser');

var home = require("./routes/home"); // main route to form page
var api = require("./routes/api"); // main route to REST api

//for flash message for "./routes/home")
var cookieParser = require('cookie-parser');
var session = require('express-session');

require('dotenv').config(); //used for passwords

var mongoose = require("mongoose");

var dbName = "extraCreditDataBase"; //for db used with mongoose connect below, other passwords are in .env doc
var mongooseFill = "mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@cluster0-shard-00-00-lqjpr.mongodb.net:27017,cluster0-shard-00-01-lqjpr.mongodb.net:27017,cluster0-shard-00-02-lqjpr.mongodb.net:27017/" + dbName + "?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

mongoose.connect(mongooseFill).then(function() {
  console.log("success with DB connect")
}).catch(function(err) {
  console.log("db isn't connecting!!!!")
}); // end connect

var app = express();

app.locals.moment = require('moment'); //parsing dates

app.use(cookieParser('flower-secret')); //for flash message
app.use(session({
  secret: "flower",
  resave: "true",
  saveUninitialized: "true"
}));


var urlEncodedParser = bodyparser.urlencoded({
  extended: false
});

//middleware to parse json for api requests
var jsonParser = bodyparser.json();


app.set('views', path.join(__dirname, "views")); // the views for "./routes/home");
app.set('view engine', 'pug'); // pug template engine

app.use('/static', express.static(path.join(__dirname, 'public'))); //public holds html for friendly error response


//route to home with middleware urlEncodedParser
console.log("in app .js")

app.use('/home', urlEncodedParser, home);

// route for api with jsonParser middleware
app.use('/api/flowers', jsonParser, api);

//app.use('/', express.static('../client/dist')); //angular path

app.use((req, res, next) => { //redirect to error pages in public folder
  //adding static here
  if (res.status(404)) {
    res.redirect('/static/friendly404page.html');
  } else if (res.status(500)) {
    res.redirect('/static/friendly500page.html');
  } else {
    res.redirect('static/friendlyErrorpage.html');
  }
}); //end error catcher


module.exports = app; //export app object