import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationDialogComponent } from './dialog/notification-dialog/notification-dialog.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { PanicNotificationComponent } from './dialog/panic-notification/panic-notification.component';


@NgModule({
  declarations: [
    NotificationDialogComponent,
    PanicNotificationComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    MaterialModule
  ]
})
export class NotificationModule { }
