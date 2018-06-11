//testerapi.js


"use strict";


//base url is now http://localhost:8080/static -- for images
//http://localhost:8080/static -- for api

function update(arg) {

  var _id = $('#editId').val(); //fetch id from input box
  var name = $("#name").val();
  var description = $("#des").val();
  var water = $("#water").val();

  let input = $("#image")[0].files[0]; //grab the image file

  var form = $('form')[0]; //grab the form

  var formData = new FormData(form); //make formData from the form

  formData.append("name", name); //add the input data to the form
  formData.append("description", description);
  formData.append("water", water);


  //if arg = true, replaceImage sent along with form and signals to flowerService to replace only the image in the flowerservice update fxn with a placeholder image, ie user wants to delete the image but not the whole flower
  if (arg) {
    formData.append("replaceImage", true);
  }


  $.ajax({
    method: "PUT",
    url: "http://localhost:8080/api/flowers/" + _id,
    contentType: false,
    dataType: 'json',
    processData: false,
    data: formData,
  }).done(function(serverResponds) {
    console.log(`flower successfully updated ${serverResponds}`);
    //clear the values
    $("#name").val("");
    $("#des").val("");
    $("#water").val("");
    $("#editId").val("");
    //repopulate the list
    getList();

  }).fail(function(serverResponds) {
    console.log(serverResponds + "error in ajax PUT request!")
  }); //end done


}; //end update fxn



function create() {

  var name = $("#name").val();
  var description = $("#des").val();
  var water = $("#water").val();

  let input = $("#image")[0].files[0];

  var form = $('form')[0];

  var formData = new FormData(form); //make the form

  formData.append("name", name); //append the user input data to form
  formData.append("description", description);
  formData.append("water", water);

  $.ajax({
    method: "POST",
    url: "http://localhost:8080/api/flowers",
    contentType: false,
    dataType: 'json',
    processData: false,
    data: formData,
  }).done(function(serverResponds) {
    console.log(`flower successfully updated ${serverResponds}`)
    //clear the values
    $("#name").val("");
    $("#des").val("");
    $("#water").val("");
    $("#editId").val("");
    //repopulate the list
    getList();

  }).fail(function(serverResponds) {
    console.log(serverResponds + "error in ajax post request!");
  }); //end done

}; //end addFlower on click


// AJAX GET request
function getList() {
  $.getJSON('http://localhost:8080/api/flowers', () => {})
    .done((serverResponds) => {
      console.log(serverResponds)
      $("#list").val(JSON.stringify(serverResponds)); //listed in text area
    })
    .fail((e) => {
      console.log(`error in getList in testerapi.js: ${e}`);
    });
}; //end getList fxn


//delete ajax call
function deleteFlower() {
  let id = $("#item_id").val();
  console.log(`Deleting this id: ${id}`);

  $.ajax({
    type: 'DELETE',
    dataType: 'json',
    crossDomain: true,
    url: "http://localhost:8080/api/flowers/" + id,
  }).done((serverResponds) => {
    console.log("The deleted quote: " + serverResponds);
    $("#item_id").val(JSON.stringify(serverResponds));

    //clear the value
    $("#item_id").val("");

    //repopulate the list
    getList();

  }).fail((err) => {
    console.log("failed to delete" + err);
  })
}; //end delete fxn



//get request for one flower
function getOneFlower() {

  let edId = $("#editId").val();
  console.log(`Getting this id: ${edId}`);

  $.getJSON('http://localhost:8080/api/flowers/' + edId, () => {})
    .done((flower) => {
      $("#name").val(flower.name);
      $("#des").val(flower.description);
      $("#water").val(flower.water);
      $('#edit').val(flower._id);
    })
    .fail((e) => {
      console.log(e);
      console.log("error in getOneFlowers in testerapi.js");
    });

}; //end getOneFlower fxb

//all of the onclicks that trigger ajax calls won't be fired off until doc is loaded
$(document).ready(() => {

  $("#fetch").click((e) => {
    e.preventDefault(); //so form doesnt submit
    console.log(`Fetching list...`);
    getList();
  });

  //list flowers on Click
  $("#edit").click((e) => {
    e.preventDefault();
    getOneFlower();
  });

  //ajax call on click to create a flower
  $("#add").on("submit", event => {
    event.preventDefault();
    create();
  });


  //update flower on click
  $("#update").on("click", event => {
    event.preventDefault();
    update();
  });

  //delete flower
  $("#delete").click((e) => {
    e.preventDefault();
    deleteFlower();
  });

  //button to delete just the image, thought service will provide a placeholder so no image is without an image
  $("#imageOnlyDelete").click((e) => {
    e.preventDefault();
    update(true);
  });

}); //end document ready