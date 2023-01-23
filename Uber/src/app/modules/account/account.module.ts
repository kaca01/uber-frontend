import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionsComponent } from './options/options.component';
import { UserDataComponent } from './user-data/user-data.component';
import { FavoriteLocationsComponent } from './favorite-locations/favorite-locations.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { ChangesDialogComponent } from './changes-dialog/changes-dialog.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    OptionsComponent,
    UserDataComponent,
    FavoriteLocationsComponent,
    ChangesDialogComponent, 
    ResetPasswordComponent
    ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NavBarModule
  ]
})
export class AccountModule { }
