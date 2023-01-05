import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from 'src/app/app.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegistrationComponent } from 'src/app/components/registration/registration.component';
import { HomePageComponent } from 'src/app/components/home/home-page/home-page.component';
import { AccountPassengerComponent } from 'src/app/components/account/passenger/profile/account-passenger.component';
import { UserDataComponent } from 'src/app/components/account/passenger/data/user-data.component';
import { FavoriteLocationsComponent } from 'src/app/components/account/passenger/favorite-locations/favorite-locations.component';
import { ProfileComponent } from 'src/app/components/account/admin/profile/profile.component';
import { DataComponent } from 'src/app/components/account/admin/data/data.component';
import { PassengersComponent } from 'src/app/components/passengers/passengers.component';
import { DriversComponent } from 'src/app/components/drivers/drivers.component';
import { AddDriverComponent } from 'src/app/components/drivers/add-driver/add-driver.component';
import { AddVehicleComponent } from 'src/app/components/drivers/add-vehicle/add-vehicle.component';
import { BasePageComponent } from 'src/app/components/history/base-page/base-page.component';
import { AdminHomeComponent } from 'src/app/components/home/admin/admin-home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent},
  { path: 'home-page', component: HomePageComponent},
  { path: 'base-page', component: BasePageComponent},
  { path: 'account-passenger', component: AccountPassengerComponent},
  { path: 'user-data', component: UserDataComponent},
  { path: 'favorite-locations', component: FavoriteLocationsComponent},
  { path: 'app-profile', component: ProfileComponent},
  { path: 'app-data', component: DataComponent},
  { path: 'passengers', component: PassengersComponent},
  { path: 'drivers', component: DriversComponent},
  { path: 'add-driver', component: AddDriverComponent},
  { path: 'add-vehicle', component: AddVehicleComponent},
  { path: 'admin-home', component: AdminHomeComponent },

  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: '**', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
