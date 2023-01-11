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
import { UUHomeComponent } from './unregistered-user/uu-home.component';
import { OrderDetailsDialog } from './order-details-dialog/order-details-dialog';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    AdminHomeComponent,
    DriverHomeComponent,
    HomePageComponent,
    LocationDialog,
    PassengerHomeComponent,
    UUHomeComponent,
    OrderDetailsDialog
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
    UUHomeComponent,
    OrderDetailsDialog
  ]
})
export class HomeModule { }
