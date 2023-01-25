import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ActivationComponent } from './registration/activation/activation.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/infrastructure/app-routing.module';

@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent, 
    ActivationComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    RegistrationComponent,
    LoginComponent
  ]
})
export class AuthModule { }
