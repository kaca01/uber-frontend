import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionsComponent } from './options/options.component';
import { UserDataComponent } from './user-data/user-data.component';
import { FavoriteLocationsComponent } from './favorite-locations/favorite-locations.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { ChangesDialogComponent } from './dialogs/changes-dialog/changes-dialog.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FavoriteDialogComponent } from './dialogs/favorite-dialog/favorite-dialog.component';
import { OrderFavoriteComponent } from './dialogs/order-favorite/order-favorite.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  declarations: [
    OptionsComponent,
    UserDataComponent,
    FavoriteLocationsComponent,
    ChangesDialogComponent, 
    ChangePasswordComponent, FavoriteDialogComponent, OrderFavoriteComponent
    ],
  imports: [
    NgxMaterialTimepickerModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NavBarModule
  ]
})
export class AccountModule { }
