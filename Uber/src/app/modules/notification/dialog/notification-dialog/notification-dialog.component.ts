import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Message } from 'src/app/domains';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css']
})
export class NotificationDialogComponent {
  message: Message = {} as Message;

  constructor(private dialogRef: MatDialogRef<NotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: Message) {
      this.message = data;
    }

  close() : void {
    this.dialogRef.close();
  }

  accept() : void {
    // TODO : call api ride/accept
  }

}
