
import { BrowserModule } from '@angular/platform-browser';
// NgModel here
import { NgModule } from '@angular/core';
//for forms/photo upload
import { FormsModule } from '@angular/forms';

// server access
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';


//app will manage routes laid out in app-routing.module
import { AppRoutingModule } from './app-routing.module';


//import bootstrap
import { AlertModule } from 'ngx-bootstrap';

//flower components and data service
import { FlowergardensComponent } from './flowergardens/flowergardens.component';

import { FlowergardensDetailComponent } from './flowergardens-detail/flowergardens-detail.component';

import { FlowerService } from './flowergardens.service';
import { NewFlowerComponent } from './new-flower/new-flower.component';



@NgModule({
  declarations: [
    AppComponent,
    FlowergardensComponent,
    FlowergardensDetailComponent,
    NewFlowerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,  // server
    AlertModule.forRoot(), // for bootstrap test alert now commented out in app.html
    AppRoutingModule,
  ],
  providers: [
    FlowerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
