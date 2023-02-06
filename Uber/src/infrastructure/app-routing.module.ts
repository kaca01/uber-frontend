import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserDataComponent } from 'src/app/modules/account/user-data/user-data.component';
import { FavoriteLocationsComponent } from 'src/app/modules/account/favorite-locations/favorite-locations.component';
import { OptionsComponent } from 'src/app/modules/account/options/options.component';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { RegistrationComponent } from 'src/app/modules/auth/registration/registration.component';
import { BasePageComponent } from 'src/app/modules/history/base-page/base-page.component';
import { AdminHomeComponent } from 'src/app/modules/home/admin/admin-home.component';
import { HomePageComponent } from 'src/app/modules/home/home-page/home-page.component';
import { AddDriverComponent } from 'src/app/modules/list-of-users/drivers/add-driver/add-driver.component';
import { AddVehicleComponent } from 'src/app/modules/list-of-users/drivers/add-vehicle/add-vehicle.component';
import { DriversComponent } from 'src/app/modules/list-of-users/drivers/drivers.component';
import { PassengersComponent } from 'src/app/modules/list-of-users/passengers/passengers.component';
import { ResetPasswordComponent } from 'src/app/modules/auth/reset-password/reset-password.component';
import { ActivationComponent } from 'src/app/modules/auth/registration/activation/activation.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent},
  { path: 'home-page', component: HomePageComponent},
  { path: 'base-page', component: BasePageComponent},
  { path: 'account', component: OptionsComponent},
  { path: 'user-data', component: UserDataComponent},
  { path: 'favorite-locations', component: FavoriteLocationsComponent},
  { path: 'passengers', component: PassengersComponent},
  { path: 'drivers', component: DriversComponent},
  { path: 'add-driver', component: AddDriverComponent},
  { path: 'add-vehicle', component: AddVehicleComponent},
  { path: 'admin-home', component: AdminHomeComponent},
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'activation/:id', component: ActivationComponent},
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: '**', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
