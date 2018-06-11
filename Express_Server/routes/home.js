//home.js

var express = require('express');
var router = express.Router();
var app = express();

var multer = require("multer"); //used for photo fileUpload

var flowerController = require("../controller/flowerController");

var flash = require('connect-flash'); //for flash messages
router.use(flash());

var upload = multer({
  storage: flowerController.storage,
  fileFilter: flowerController.imageFilter
}); //upload object to save photos


router.get('/', flowerController.find); //fills in existing flowers on home page
console.log("in home route non api .js")
router.post('/', upload.single('image'), flowerController.create); //stores new item added in home page  in db

router.get('/edit/:flowerid', flowerController.edit); //on edit page, fills in fields so user can see what they want to edit


router.post('/save/:id', flowerController.saveEdit); // saves edits  to db


router.post('/delete/:id', flowerController.delete); //delete button redirect

//provides flash messages
router.use(function(err, req, res, next) {
  if (err.message == "OnlyImageFilesAllowed") {
    req.flash('fileUploadError', "Please select an image file with a jpg, png, or gif filename extension.");
    res.redirect('/'); //no upload of non-photos on homepage
  } else if (err.message == 'Edit Page -- OnlyImageFilesAllowed') {
    req.flash('fileUploadError', "Please select an image file with a jpg, png, or gif filename extension.");
    res.redirect('/edit/' + req.body.id); //no upload of non-photos on edit page
  } else if (err.message == 'Cannot read property \'filename\' of undefined') {
    req.flash('fileUploadError', "There's no file selected, please select again.");
    res.redirect('/edit/' + req.body.id);
  } else {
    next(err)
  }
}); // end error handling



module.exports = router; //export the router object