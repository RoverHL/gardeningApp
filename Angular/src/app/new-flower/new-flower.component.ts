import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ActivatedRoute } from '@angular/router'; //router


import { FormsModule } from '@angular/forms'; //for forms/photo upload


import { Location } from '@angular/common'; //use location go back method

import { Flower } from '../flower'; //data model
import { FlowerService } from '../flowergardens.service'; //data fetching service


@Component({
  selector: 'app-new-flower',
  templateUrl: './new-flower.component.html',
  styleUrls: ['./new-flower.component.css'],
  providers: [FlowerService]
})



export class NewFlowerComponent implements OnInit {

  @Output() newFlower = new EventEmitter();


  flower: any = {}; //flower object coming from form


  // larry's property for the file upload element
  fileToUpload: File = null;

  constructor(private flowerService: FlowerService, private route: ActivatedRoute,
    private location: Location) { }

  // will be used to clear this field later
  fileInputField = null;

  // bound to change event on file upload html control
  handleFileInput(target): void { //target is incoming form
    this.fileToUpload = target.files.item(0); //the uploaded image
    this.fileInputField = target; //the form body with rest of the info, water, description, etc
  };


  ngOnInit() { }  //ngOnInit

  //save flower
  save(newFlowerForm): void {

    // file upload uses FormData
    let formData = new FormData();

    formData.append('image', this.fileToUpload);
    formData.append('name', this.flower.name);
    formData.append('description', this.flower.description);
    formData.append('water', this.flower.water);
    formData.append('height', this.flower.height);
    formData.append('season', this.flower.season);


    this.flowerService.createFlower(formData)
      .subscribe((flower) => { //call back fxn to handle form clearing etc
        //when observable returns this happens
        this.newFlower.emit(); //advise reset to flowergardens to update its list of flowers
        newFlowerForm.reset(); //empty form
        this.fileInputField.value = ""; //set back to none
      });
  }; //end save, send to create flower


};// end export class
