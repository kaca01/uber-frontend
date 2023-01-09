import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin/admin-home.component';
import { DriverHomeComponent } from './driver/driver-home.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LocationDialog } from './location-dialog/location_dialog';
import { PassengerHomeComponent } from './passenger/passenger-home.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MapModule } from '../map/map.module';
import { NavBarModule } from '../nav-bar/nav-bar.module';

@NgModule({
  declarations: [
    AdminHomeComponent,
    DriverHomeComponent,
    HomePageComponent,
    LocationDialog,
    PassengerHomeComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MapModule,
    NavBarModule
  ],
  exports: [
    AdminHomeComponent,
    DriverHomeComponent,
    HomePageComponent,
    LocationDialog,
    PassengerHomeComponent,
  ]
})
export class HomeModule { }
