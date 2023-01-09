import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from './admin/admin-navbar.component';
import { RUNavbarComponent } from './registered-user/ru-navbar.component';
import { UUNavbarComponent } from './unregistered-user/uu-navbar.component';



@NgModule({
  declarations: [
    AdminNavbarComponent,
    RUNavbarComponent,
    UUNavbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NavBarModule { }
