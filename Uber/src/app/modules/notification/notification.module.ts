import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationDialogComponent } from './dialog/notification-dialog/notification-dialog.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { PanicNotificationComponent } from './dialog/panic-notification/panic-notification.component';
import { RejectDialogComponent } from './dialog/reject-dialog/reject-dialog.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NotificationDialogComponent,
    PanicNotificationComponent,
    RejectDialogComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class NotificationModule { }
