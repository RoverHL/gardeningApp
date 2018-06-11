import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Flower } from '../flower'; //data model
import { FlowerService } from '../flowergardens.service'; //data fetching service

import { ActivatedRoute } from '@angular/router'; //router


@Component({
  selector: 'app-flowergardens',
  templateUrl: './flowergardens.component.html',
  styleUrls: ['./flowergardens.component.css']
})


export class FlowergardensComponent implements OnInit {


  flowers: any = null; //holds flowers after data served

  imageUrl: string = null; //base to extend path to retrieve image in API public file, it's set in environment folder


  constructor(private flowerService: FlowerService) { }

  //gets flowers through service after page loaded, populates main page
  ngOnInit() {
    this.flowerService.getFlowers()
      .subscribe((flowers) => {
        this.flowers = flowers; //assigned to flowers variable above
      })
    this.imageUrl = this.flowerService.imageUrl; //made available from dataservice to construct full image path in flowergardens.component.html
  }

  //responds to html updateFlowersList() triggered by event emitter after new flower is created and observable callback sparks event emitter linked to flowergarden html through the <app new flower> selector
  updateFlowerList(): void { //call flowerservice to retrieve all flowers
    this.flowerService.getFlowers().subscribe((flowers) => {

    }) //end flowerservice request
  }; //end  flowers list fxn

}; //end export class
