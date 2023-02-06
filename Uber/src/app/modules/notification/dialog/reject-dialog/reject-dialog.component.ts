import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PanicRequest, Ride, Vehicle } from 'src/app/domains';
import { UserService } from 'src/app/modules/list-of-users/user.service';
import { PanicService } from 'src/app/modules/notification/service/panic.service';

@Component({
  selector: 'app-reject-dialog',
  templateUrl: './reject-dialog.component.html',
  styleUrls: ['./reject-dialog.component.css']
})
export class RejectDialogComponent {

  message : string = "";
  rideId: number = 0;
  panicRequest: PanicRequest = {} as PanicRequest;

  constructor(private userService : UserService,
              private dialogRef: MatDialogRef<RejectDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
                this.rideId = data;
  }

  close() : void {
    this.dialogRef.close();
  }

  save() : void {
    this.panicRequest.reason = this.message;
    this.userService.cancelRide(this.rideId, this.panicRequest).subscribe((res: Ride) => {
      console.log("rejectiooooooooooooon");
      console.log(res)
    });
    this.dialogRef.close();
  }
}
