//flowerService.js

//FlowerService does most of the work with incoming images and data to add properties to flower it creates

var Flower = require("../models/flowerModel"); //grab flower model

var FlowerService = {};

//function that picks placeholder images
function flowerPath() {
  const flowerPathArray = ["flower0.jpg", "flower1.jpg", "flower2.jpg", "flower3.png", "flower4.jpg"];

  let num = Math.round(Math.random() * 4);
  //grab an image and return its path for use in update and create flowr fxns
  return "image/" + flowerPathArray[num];

}; //end flowerPath fxn


// call for all Flowers from the database
FlowerService.list = function(searchParams) {

  console.log("in FlowerService list fxn, searching...");

  return Flower.find(searchParams)

    .then((flowers) => {
      console.log("in FlowerService list fxn, finishing successfully...");
      return flowers;
    })
    .catch((err) => {
      throw err;
    }); //end catch

}; //end list


//  find one flower
FlowerService.read = function(arg_req) { // argument here is req.params.flowerid

  console.log("in FlowerService list fxn, reading...");

  return Flower.findOne({
      '_id': arg_req //  req.params.flowerid
    })
    .then(function(flower) {
      console.log("in FlowerService read fxn, finishing successfully...");
      return flower;
    }) //end then
    .catch((err) => {
      throw err;
    }); //end catch
}; // end  find


//  create flower
FlowerService.create = function(dataArg) {

  console.log("in FlowerService create fxn, creating...");

  var flower = new Flower(); //new flower instance

  //add image-related properties if they exist
  if (dataArg && dataArg.file) {
    flower.imagePath = "/image/" + dataArg.file.filename;
    flower.imageOriginalName = dataArg.file.originalname;
    flower.mimetype = dataArg.file.mimetype;
    flower.imageSize = dataArg.file.size;
  } // end if for images


  //if there's no flower.imagePath yet, add a placeholder image
  if (!flower.imagePath) {
    flower.imagePath = flowerPath(); //flowerPath function defined above
  }


  //name etc are drawn from html input fields
  flower.name = dataArg.body.name;
  flower.water = dataArg.body.water;
  flower.description = dataArg.body.description;
  flower.season = dataArg.body.season;
  flower.height = dataArg.body.height;

  console.log("in FlowerService create fxn, finishing ...");
  return flower.save(); //end then
}; //end create




//  update
FlowerService.update = function(id, dataArg) {

  console.log("in FlowerService update fxn, updating...");

  let data = dataArg;

  return Flower.findOne({ '_id': id })
    .then((flower) => {
      //same as create, if image is uploaded it will become the image

      if (data && data.file) { //if there is an uploaded image use that to input the new image in the db
        flower.imagePath = "/image/" + data.file.filename;
        flower.imageOriginalName = data.file.originalname;
        flower.mimetype = data.file.mimetype;
        flower.imageSize = data.file.size;
      } // end if for images

      //replaceImage will come in body if user wants to delete image, existing image is replaced with a placeholder
      if (data && data.body.replaceImage) {
        flower.imagePath = flowerPath(); //picks a flower placeholder image
      }
      //name etc are drawn from input fields html
      flower.name = data.body.name;
      flower.water = data.body.water;
      flower.description = data.body.description;
      flower.season = data.body.season;
      flower.height = data.body.height;

      return flower.save();
      console.log("in FlowerService update fxn, finishing ...")

    }); //end find by id
}; //end update


//  delete
FlowerService.delete = function(_id) {

  console.log("in FlowerService delete fxn, deleting...");

  return Flower.findByIdAndRemove(_id)
    .then((flower) => {
      console.log("in FlowerService finishing delete fxn sucessfully...");
      return flower;
    }) //end then
    .catch((err) => {
      console.log("error in flowerservice delete");
      throw err; //where is this throwing to?
    }); //end catch
}; //end delete


module.exports = FlowerService;