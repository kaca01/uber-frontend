import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin/admin-home.component';
import { DriverHomeComponent } from './driver/driver-home.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LocationDialog } from './location-dialog/location_dialog';
import { PassengerHomeComponent } from './passenger/passenger-home.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { MapModule } from '../map/map.module';
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { OrderDetailsDialog } from './order-details-dialog/order-details-dialog';
import { MatChipsModule } from '@angular/material/chips';
import { FavoriteRideDialogComponent } from './favorite-ride-dialog/favorite-ride-dialog.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    DriverHomeComponent,
    HomePageComponent,
    LocationDialog,
    PassengerHomeComponent,
    OrderDetailsDialog,
    FavoriteRideDialogComponent
  ],
  imports: [
    NgxMaterialTimepickerModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MapModule,
    NavBarModule,
    FormsModule,
    MatChipsModule
  ],
  exports: [
    AdminHomeComponent,
    DriverHomeComponent,
    HomePageComponent,
    LocationDialog,
    PassengerHomeComponent,
    OrderDetailsDialog,
    FavoriteRideDialogComponent
  ]
})
export class HomeModule { }
