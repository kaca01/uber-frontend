import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewRoutingModule } from './review-routing.module';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReviewDialogComponent
  ],
  imports: [
    CommonModule,
    ReviewRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ReviewDialogComponent
  ]
})
export class ReviewModule { }
