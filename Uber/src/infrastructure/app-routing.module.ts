import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from 'src/app/app.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegistrationComponent } from 'src/app/components/registration/registration.component';
import { UUHomeComponent } from 'src/app/components/home/unregistered-user/uu-home.component';
import { PassengerHomeComponent } from 'src/app/components/home/passenger/passenger-home.component';
import { AdminHomeComponent } from 'src/app/components/home/admin/admin-home.component';
import { AccountPassengerComponent } from 'src/app/components/account/passenger/profile/account-passenger.component';
import { UserDataComponent } from 'src/app/components/account/passenger/data/user-data.component';
import { FavoriteLocationsComponent } from 'src/app/components/account/passenger/favorite-locations/favorite-locations.component';
import { ProfileComponent } from 'src/app/components/account/admin/profile/profile.component';
import { DataComponent } from 'src/app/components/account/admin/data/data.component';
import { PassengersComponent } from 'src/app/components/passengers/passengers.component';
import { DriversComponent } from 'src/app/components/drivers/drivers.component';
import { DriverHomeComponent } from 'src/app/components/home/driver/driver-home.component';
import { AddDriverComponent } from 'src/app/components/drivers/add-driver/add-driver.component';
import { AddVehicleComponent } from 'src/app/components/drivers/add-vehicle/add-vehicle.component';
import { RideHistoryComponent } from 'src/app/components/history/ride-history/ride-history.component';
import { RideDetailsComponent } from 'src/app/components/history/ride-details/ride-details.component';
import { RatingsComponent } from 'src/app/components/history/ratings/ratings.component';
import { BasePageComponent } from 'src/app/components/base-page/base-page.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent},
  { path: 'uu-home', component: UUHomeComponent},
  { path: 'passenger-home', component: PassengerHomeComponent},
  { path: 'admin-home', component: AdminHomeComponent},
  { path: 'account-passenger', component: AccountPassengerComponent},
  { path: 'user-data', component: UserDataComponent},
  { path: 'favorite-locations', component: FavoriteLocationsComponent},
  { path: 'app-profile', component: ProfileComponent},
  { path: 'app-data', component: DataComponent},
  { path: 'passengers', component: PassengersComponent},
  { path: 'drivers', component: DriversComponent},
  { path: 'driver-home', component: DriverHomeComponent},
  { path: 'add-driver', component: AddDriverComponent},
  { path: 'add-vehicle', component: AddVehicleComponent},
  { path: 'ride-history', component: RideHistoryComponent},
  { path: 'ride-details', component: RideDetailsComponent},
  { path: 'ratings', component: RatingsComponent},
  { path: 'base-page', component: BasePageComponent},
  { path: '', redirectTo: '/uu-home', pathMatch: 'full' },
  { path: '**', component: UUHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
