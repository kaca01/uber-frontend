import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPassengerComponent } from './passenger/options/account-passenger.component';
import { DataComponent } from './admin/data/data.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { UserDataComponent } from './passenger/data/user-data.component';
import { FavoriteLocationsComponent } from './passenger/favorite-locations/favorite-locations.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarModule } from '../nav-bar/nav-bar.module';

@NgModule({
  declarations: [
    AccountPassengerComponent,
    DataComponent,
    ProfileComponent,
    UserDataComponent,
    FavoriteLocationsComponent
    ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NavBarModule
  ]
})
export class AccountModule { }
