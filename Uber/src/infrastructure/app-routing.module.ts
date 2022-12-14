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
  { path: '', redirectTo: '/uu-home', pathMatch: 'full' },
  { path: '**', component: UUHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
