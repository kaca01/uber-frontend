import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from 'src/app/app.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegistrationComponent } from 'src/app/components/registration/registration.component';
import { UUHomeComponent } from 'src/app/components/home/unregistered-user/uu-home.component';
import { PassengerHomeComponent } from 'src/app/components/home/passenger/passenger-home.component';
import { AdminHomeComponent } from 'src/app/components/home/admin/admin-home.component';
import { PassengersComponent } from 'src/app/components/passengers/passengers.component';
import { DriversComponent } from 'src/app/components/drivers/drivers.component';
import { DriverHomeComponent } from 'src/app/components/home/driver/driver-home.component';
import { AddDriverComponent } from 'src/app/components/drivers/add-driver/add-driver.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent},
  { path: 'uu-home', component: UUHomeComponent},
  { path: 'passenger-home', component: PassengerHomeComponent},
  { path: 'admin-home', component: AdminHomeComponent},
  { path: 'passengers', component: PassengersComponent},
  { path: 'drivers', component: DriversComponent},
  { path: 'driver-home', component: DriverHomeComponent},
  { path: 'add-driver', component: AddDriverComponent},
  { path: '', redirectTo: '/uu-home', pathMatch: 'full' },
  { path: '**', component: UUHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
