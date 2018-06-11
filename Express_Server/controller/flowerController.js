//flowerController.js

var multer = require("multer"); //used for multipart/form-data for imagefilter and storage
var FlowerService = require("../services/FlowerService");

//used for image upload and storage
const storage = multer.diskStorage({ //puts uploaded images in public/image
  destination: function(req, file, cb) {
    cb(null, 'public/image');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
}); //end const storage


const imageFilter = function(req, file, cb) {
  // accept image only, first one set for uploads going through  home route
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/) && req.route.path == "/save/:id") {
    return cb(new Error('Edit Page -- OnlyImageFilesAllowed'), false);
  } else
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('OnlyImageFilesAllowed'), false);
  }
  cb(null, true);

}; //in imagefilter

var flowerController = {};

//used to populate homepage
flowerController.find = function(req, res) {
  FlowerService.list() //call db access functions in FlowerService
    .then((flowers) => {
      //home get view
      res.render('home', {
        flashMsg: req.flash("fileUploadError"),
        "flowers": flowers,
      }) //end render
    }) //end then
    .catch((err) => {
      console.log(err);
    }); //end catch
}; // end flowercontroller find

console.log("in flowercontroller  non api .js")
//create new entry
flowerController.create = function(req, res) {
  let data = req; //sends everything to data service so it can parse out if file or not etc is available and add that to an instance of flower

  FlowerService.create(data)
    .then(() => {
      res.redirect("/home") //sends back to homepage
    })
    .catch(function(err) {
      console.log(err)
    });
}; // end flower create


//go to edit entry page and populate fields
flowerController.edit = function(req, res) {

  var searchBy = req.params.flowerid;

  FlowerService.read({
      _id: req.params.flowerid
    }) //end read
    .then(function(flower) { //takes flower and creates an object so page can show it
      res.render('edit', {
        name: flower.name,
        water: flower.water,
        description: flower.description,
        imagePath: flower.imagePath,
        id: req.params.flowerid,
        flashMsg: req.flash("fileUploadError"),
      }) //end render
    }) //end then
    .catch(function(err) {
      console.log(err);
    });
}; // end flower edit


flowerController.saveEdit = function(req, res) {
  var data = req; //sends everything to data service so it can parse out if file or not etc is available and add that to an instance of flower

  FlowerService.update(req.params.id, data)
    .then(function(flower) {
      res.redirect("/home")
    }) //end then
    .catch(function(err) {
      console.log(err)
    });
}; // end flower saved


flowerController.delete = function(req, res) {
  FlowerService.delete(req.params.id)
    .then(function(flower) {
      res.redirect("/home")
    }) //end then
    .catch(function(err) {
      console.log(err)
    });
}; // end flower deleted


module.exports = flowerController;

module.exports.storage = storage;

module.exports.imageFilter = imageFilter;