import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasePageComponent } from './base-page/base-page.component';
import { RatingsComponent } from './ratings/ratings.component';
import { RideDetailsComponent } from './ride-details/ride-details.component';
import { RideHistoryComponent } from './ride-history/ride-history.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/infrastructure/app-routing.module';
import { NavBarModule } from '../nav-bar/nav-bar.module';

@NgModule({
  declarations: [
    BasePageComponent,
    RatingsComponent,
    RideDetailsComponent,
    RideHistoryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NavBarModule
  ]
})
export class HistoryModule { }
