import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Message, Ride } from 'src/app/domains';
import { RideService } from 'src/app/modules/home/service/ride.service';
import { UserService } from 'src/app/modules/list-of-users/user.service';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css']
})
export class NotificationDialogComponent {
  message: Message = {} as Message;

  constructor(private rideService: RideService,
              private dialogRef: MatDialogRef<NotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: Message) {
      this.message = data;
    }

  close() : void {
    this.dialogRef.close();
  }

  accept() : void {
    this.rideService.accept(this.message.rideId).subscribe((res: Ride) => {
        console.log("RIDE ACCEPTED!");
    });
  }
}
