//apiController.js

//api controller passes input to flower service, mainly deals with returning info back to page in json

var FlowerService = require("../services/FlowerService");

var apiController = {};


//used to populate homepage
apiController.find = function(req, res) {
  FlowerService.list({})
    .then((flowers) => {
      res.json(flowers);
      console.log("api controller find successful");
    }) //end then
    .catch((err) => {
      console.log(`api controller find flowers failed: ${err}`);
    }); //end catch
}; // end flowercontroller find


//create new entry
apiController.create = function(req, res) {
  let data = req;
  FlowerService.create(data)
    .then(function(flower) {
      res.status(201);
      res.send(JSON.stringify(flower));
      console.log(`api controller create flower successful: ${flower}`);
    }) //end then
    .catch(function(err) {
      console.log(`api controller create flower failed: ${err}`);
    }); //end catch
}; // end flower create


//go to edit entry page and populate fields
apiController.edit = function(req, res) {

  var searchBy = req.params.flowerid;

  FlowerService.read({
      _id: req.params.flowerid
    }) //end read
    .then(function(flower) {
      res.status(200);
      res.send(JSON.stringify(flower));
      console.log(`api controller read flower successful: ${flower}`)
    }).catch(() => {
      console.log(`api controller read a flower failed: ${err}`)
      res.status(404)
      res.end()
    }); //end catch
}; // end flower edit


//user in edit mode can save a new image and/or new data
apiController.saveEdit = function(req, res) {
  var data = req;
  FlowerService.update(req.params.id, data)
    .then(function(updatedFlower) { //returned from flowerService
      res.status(200);
      res.send(JSON.stringify(updatedFlower));
      console.log(`api controller saveEdit flower successful: ${updatedFlower}`);
    }).catch((err) => {
      console.log(`api controller saveEdit flower failed: ${err}`);
      res.status(404) //if something goes wrong sends a 404
      res.end()
    }); //end catch
}; // end flower saveedit


//deletes 
apiController.delete = function(req, res) {

  FlowerService.delete(req.params.id)
    .then(function(flower) {
      console.log(flower)
      res.status(200);
      res.json("deleted: " + flower);
      console.log(`api controller deleted: ${flower}`)
    }).catch(function(err) {
      console.log(`api controller delete flower failed: ${err}`)
    });
}; // end flower deleted



module.exports = apiController;