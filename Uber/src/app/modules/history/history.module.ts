import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasePageComponent } from './base-page/base-page.component';
import { RatingsComponent } from './ratings/ratings.component';
import { RideDetailsComponent } from './ride-details/ride-details.component';
import { RideHistoryComponent } from './ride-history/ride-history.component';



@NgModule({
  declarations: [
    BasePageComponent,
    RatingsComponent,
    RideDetailsComponent,
    RideHistoryComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HistoryModule { }
