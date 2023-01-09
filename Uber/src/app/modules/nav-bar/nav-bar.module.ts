import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from './admin/admin-navbar.component';
import { RUNavbarComponent } from './registered-user/ru-navbar.component';
import { UUNavbarComponent } from './unregistered-user/uu-navbar.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from '../home/home.module';
import { AuthModule } from '../auth/auth.module';
import { AppRoutingModule } from 'src/infrastructure/app-routing.module';

@NgModule({
  declarations: [
    AdminNavbarComponent,
    RUNavbarComponent,
    UUNavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    AdminNavbarComponent,
    RUNavbarComponent,
    UUNavbarComponent
  ],
})
export class NavBarModule { }
