//api.js

//sets routes for the api and info for dealing with AJAX and preflights

var express = require('express');
var router = express.Router();
var app = express();


//handles file uploads to the API since images can upload
var multer = require("multer");

// using multer-related upload in flowerController
var flowerController = require("../controller/flowerController");

var apiController = require("../controller/apiController");

var flash = require('connect-flash'); //for flash messages
router.use(flash()); // depends where you're using it

console.log("in api.js");

var upload = multer({
  storage: flowerController.storage,
  fileFilter: flowerController.imageFilter
}); //upload object to save photos

//the access-control are used for preflight requests
router.use((req, res, next) => {

  res.set({
    'Content-type': "application/json", //mimetype set same for all responses used in  apiController
    // Allow AJAX access from any domain
    'Access-Control-Allow-Origin': '*',
    // Allow methods and headers for 'preflight'
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
  }) //end res.set

  // if this is a preflight, send the response with headers, avoid running through rest of page
  if (req.method == 'OPTIONS') {
    return res.status(200).end();
  } //end if

  next();
}); //end preflight


//retrieve flowers
router.get('/', apiController.find);


//create flower
router.post('/', upload.single('image'), apiController.create); //stores new item added in home page  in db

//retrieve one flower
router.get('/:flowerid', apiController.edit); //fills in fields so user can begin to edit

//update flower
router.put('/:id', upload.single('image'), apiController.saveEdit); // saves edits  to db


//delete one flower
router.delete('/:id', apiController.delete);


//provides error messages to console from image upload
router.use(function(err, req, res, next) {
  console.log(`error tied to multer upload in api.js ${err}`);
  next(err);
}); // end error handling


module.exports = router; //export the router object