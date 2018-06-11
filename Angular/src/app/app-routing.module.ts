import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import base flowers component, gallery view
import { FlowergardensComponent } from './flowergardens/flowergardens.component';
//import flower detail view
import { FlowergardensDetailComponent } from './flowergardens-detail/flowergardens-detail.component';

//do i need this here not using as route yet
import { NewFlowerComponent } from './new-flower/new-flower.component';



const routes: Routes = [
  // '/' redirects to flowergardenscomponent, main view of all flowers
  { path: '', redirectTo: '/flowergardens', pathMatch: 'full' },
  { path: 'flowergardens', component: FlowergardensComponent },
  { path: 'detail/:id', component: FlowergardensDetailComponent },
  { path: 'new', component: NewFlowerComponent }, //make sure no slash before or after new unless there is something after ie an id or something
];


@NgModule({
  // imports the RouterModule
  imports: [RouterModule.forRoot(routes)],
  //also exports the RouterModule
  exports: [RouterModule],
})

export class AppRoutingModule { }
