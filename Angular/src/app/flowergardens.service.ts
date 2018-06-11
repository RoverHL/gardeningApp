import { Injectable } from '@angular/core';

//subscribe from flowers component
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


// launch options of ng serve or ng build
import { environment } from '../environments/environment';

//grab http client to handle on the ajax calling etc
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FlowerService {

  //url to api for localhost, see environment folder
  private apiUrl = environment.apiUrl;

  //flower components use this to show images
  imageUrl = environment.imageUrl;

  constructor(private http: HttpClient) { }; //set up server


  //save a new flower
  createFlower(flower: FormData) {
    return this.http.post(this.apiUrl + 'api/flowers', flower);
  }

  //get all flowers for main page
  getFlowers() {
    return this.http.get(this.apiUrl + 'api/flowers');
  }

  //view one flower in detail
  getOneFlower(id) {
    return this.http.get(this.apiUrl + 'api/flowers/' + id);
  }


  //saveEdit
  saveEdit(id, data) {
    return this.http.put(this.apiUrl + 'api/flowers/' + id, data);
  }

  //delete
  deleteFlower(id) {
    return this.http.delete(this.apiUrl + 'api/flowers/' + id);
  }

}
