import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPassengerComponent } from './passenger/profile/account-passenger.component';
import { DataComponent } from './admin/data/data.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { UserDataComponent } from './passenger/data/user-data.component';
import { FavoriteLocationsComponent } from './passenger/favorite-locations/favorite-locations.component';



@NgModule({
  declarations: [
    AccountPassengerComponent,
    DataComponent,
    ProfileComponent,
    UserDataComponent,
    FavoriteLocationsComponent
    ],
  imports: [
    CommonModule
  ]
})
export class AccountModule { }
