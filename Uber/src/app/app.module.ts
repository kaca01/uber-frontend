import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTreeModule} from '@angular/material/tree';
import { AppRoutingModule } from '../infrastructure/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/infrastructure/material.module';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UUHomeComponent } from './components/home/unregistered-user/uu-home.component';
import { PassengerHomeComponent } from './components/home/passenger/passenger-home.component';
import { DriverHomeComponent } from './components/home/driver/driver-home.component';
import { AdminHomeComponent } from './components/home/admin/admin-home.component';
import { UUNavbarComponent } from './components/navbar/unregistered-user/uu-navbar.component';
import { RUNavbarComponent } from './components/navbar/registered-user/ru-navbar.component';
import { AdminNavbarComponent } from './components/navbar/admin/admin-navbar.component';
import { AccountPassengerComponent } from 'src/app/components/account/passenger/profile/account-passenger.component';
import { UserDataComponent } from 'src/app/components/account/passenger/data/user-data.component';
import { FavoriteLocationsComponent } from 'src/app/components/account/passenger/favorite-locations/favorite-locations.component';
import { ProfileComponent } from './components/account/admin/profile/profile.component';
import { DataComponent } from './components/account/admin/data/data.component';
import { RatingsComponent } from './components/history/ratings/ratings.component';
import { RideDetailsComponent } from './components/history/ride-details/ride-details.component';
import { RideHistoryComponent } from './components/history/ride-history/ride-history.component';
import { PassengersComponent } from './components/passengers/passengers.component';
import { PassengerService } from './service/passenger.service';
import { DriversComponent } from './components/drivers/drivers.component';
import { DriverService } from './service/driver.service';
import { AddDriverComponent } from './components/drivers/add-driver/add-driver.component';
import { AddVehicleComponent } from './components/drivers/add-vehicle/add-vehicle.component';
import { BasePageComponent } from './components/base-page/base-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    UUHomeComponent,
    PassengerHomeComponent,
    AdminHomeComponent,
    DriverHomeComponent,
    UUNavbarComponent,
    RUNavbarComponent,
    AdminNavbarComponent,
    AccountPassengerComponent,
    UserDataComponent,
    FavoriteLocationsComponent,
    ProfileComponent,
    DataComponent,
    RatingsComponent,
    RideDetailsComponent,
    RideHistoryComponent,
    PassengersComponent,
    DriversComponent,
    AddDriverComponent,
    AddVehicleComponent,
    BasePageComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
