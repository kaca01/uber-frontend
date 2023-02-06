import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin/admin-home.component';
import { DriverHomeComponent } from './driver/driver-home.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LocationDialog } from './dialogs/location-dialog/location_dialog';
import { PassengerHomeComponent } from './passenger/passenger-home.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { MapModule } from '../map/map.module';
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { OrderDetailsDialog } from './dialogs/order-details-dialog/order-details-dialog';
import { MatChipsModule } from '@angular/material/chips';
import { FavoriteRideDialogComponent } from './dialogs/favorite-ride-dialog/favorite-ride-dialog.component';
import { ReviewModule } from '../review/review.module';
import { PanicDialogComponent } from './dialogs/panic-dialog/panic-dialog.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    DriverHomeComponent,
    HomePageComponent,
    LocationDialog,
    PassengerHomeComponent,
    OrderDetailsDialog,
    FavoriteRideDialogComponent,
    PanicDialogComponent,
  ],
  imports: [
    NgxMaterialTimepickerModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MapModule,
    NavBarModule,
    FormsModule,
    MatChipsModule,
    ReviewModule
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
