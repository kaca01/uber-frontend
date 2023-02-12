import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewRoutingModule } from './review-routing.module';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListOfUsersModule } from '../list-of-users/list-of-users.module';


@NgModule({
  declarations: [
    ReviewDialogComponent
  ],
  imports: [
    CommonModule,
    ReviewRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ListOfUsersModule
  ],
  exports: [
    ReviewDialogComponent
  ]
})
export class ReviewModule { }
