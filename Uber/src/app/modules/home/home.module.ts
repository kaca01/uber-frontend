import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin/admin-home.component';
import { DriverHomeComponent } from './driver/driver-home.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LocationDialog } from './location-dialog/location_dialog';
import { PassengerHomeComponent } from './passenger/passenger-home.component';



@NgModule({
  declarations: [
    AdminHomeComponent,
    DriverHomeComponent,
    HomePageComponent,
    LocationDialog,
    PassengerHomeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
