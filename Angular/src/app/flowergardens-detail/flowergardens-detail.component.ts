import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; //router


import { Location } from '@angular/common'; //location used for back() fxns to return to prior page

import { FlowerService } from '../flowergardens.service'; //data fetching service to api

@Component({
  selector: 'app-flowergardens-detail',
  templateUrl: './flowergardens-detail.component.html',
  styleUrls: ['./flowergardens-detail.component.css'],
  providers: [FlowerService]
})


export class FlowergardensDetailComponent implements OnInit {

  //from larry fxn -- used to toggle between edit view and detail view, editing mode initially set to false to show detail view before clicking on edit link
  editing: boolean = false;

  flower: any; //will hold flower after flowerService provides it
  imageUrl: string = ""; //base to extend path to retrieve image in public file, its set in environment folder
  // larry's property for the file upload element
  fileToUpload: File = null;
  // will be used to clear this field later
  fileInputField = null;

  // larry fxn  to change event on file upload html control
  handleFileInput(target): void { //target is incoming form
    this.fileToUpload = target.files.item(0); //the uploaded image
    this.fileInputField = target; //the form body with rest of the info, water, description, etc
  };


  //instantiate and get properties
  constructor(private route: ActivatedRoute, private router: Router,
    private flowerService: FlowerService,
    private location: Location) { }

  ngOnInit(): void {
    this.getFlowerForService(); //get chosen flower for detail view after page loaded
  }

  //larry's fxn when clicked, if setEditMode(true), editing will be set to true, edit form visible, if setEditMode(false), editing set to false
  setEditMode(arg): void {
    this.editing = (arg ? true : false);
  }; //end setEditMode

  //call on flower service to call on API with flower id and populate card
  getFlowerForService(): void {
    const param_id = this.route.snapshot.paramMap.get('id'); //grab the id from the route
    this.flowerService.getOneFlower(param_id)
      .subscribe((flower) => {
        this.flower = flower;
      });

    this.imageUrl = this.flowerService.imageUrl; //made available from dataservice to construct full image path in flowergardens-details.component.html
  }; //end getFlower

  //grabs data from form
  updateForService(obj: any): void {

    let formData = new FormData();

    //change the properties of this.flower to match the edited (or left unchanged) properties from the form...
    this.flower.name = obj.editName;
    this.flower.description = obj.editDes;
    this.flower._id = obj.edit_id;
    this.flower.water = obj.editWater;
    this.flower.height = obj.editHeight;
    this.flower.season = obj.editSeason;

    //append to form for sending
    formData.append('image', this.fileToUpload);
    formData.append('name', this.flower.name);
    formData.append('description', this.flower.description);
    formData.append('water', this.flower.water);
    formData.append('height', this.flower.height);
    formData.append('season', this.flower.season);
    formData.append('id', this.flower._id);

    //if Remove image button in html is checked, api service will get a 'replaceImage' value and remove existing image
    if (obj.remove) {
      formData.append("replaceImage", "true");
    }

    this.flowerService.saveEdit(this.flower._id, formData).subscribe((response) => {

      //after update is saved, going back to the non-edit view on the details page, but now with the updated image
      this.getFlowerForService(); //need to call the db because that's the only place where the new image path is saved
      this.setEditMode(false) //return to edit mode view
    });
  }; //end saveEditForService


  delete(): void {
    this.flowerService.deleteFlower(this.flower._id)
      .subscribe((response) => {
        console.log(response)
        this.router.navigate(['/']); //returns to home page after delete
      });
  }; //end saveEditForService


  //angular hero method to  return to last location
  goBack(): void {
    this.location.back();
  };


} //end class
