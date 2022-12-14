import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from 'src/app/app.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegistrationComponent } from 'src/app/components/registration/registration.component';
import { UUHomeComponent } from 'src/app/components/home/unregistered-user/uu-home.component';
import { PassengerHomeComponent } from 'src/app/components/home/passenger/passenger-home.component';
import { AdminHomeComponent } from 'src/app/components/home/admin/admin-home.component';
import { DriverHomeComponent } from 'src/app/components/home/driver/driver-home.component';
import { PassengerHistoryComponent } from 'src/app/components/history/passenger/passenger-history.component';
import { PassengerDetailsComponent } from 'src/app/components/history/details/passenger-details/passenger-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent},
  { path: 'uu-home', component: UUHomeComponent},
  { path: 'passenger-home', component: PassengerHomeComponent},
  { path: 'admin-home', component: AdminHomeComponent},
  { path: 'driver-home', component: DriverHomeComponent},
  { path: 'passenger-history', component: PassengerHistoryComponent},
  { path: 'passenger-details', component: PassengerDetailsComponent},
  { path: '', redirectTo: '/uu-home', pathMatch: 'full' },
  { path: '**', component: UUHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
