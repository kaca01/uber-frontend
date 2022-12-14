import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { PassengersComponent } from './components/passengers/passengers.component';
import { PassengerService } from './service/passenger.service';

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
    PassengersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
