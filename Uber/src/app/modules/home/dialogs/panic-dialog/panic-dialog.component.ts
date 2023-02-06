import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/modules/list-of-users/user.service';
import { RideService } from '../../service/ride.service';
import { Panic, Ride } from 'src/app/domains';
import { MapService } from 'src/app/modules/map/map.service';

@Component({
  selector: 'app-panic-dialog',
  templateUrl: './panic-dialog.component.html',
  styleUrls: ['./panic-dialog.component.css']
})
export class PanicDialogComponent {
  message : string = "";
  constructor(private userService : UserService, 
              private _snackBar: MatSnackBar, 
              private rideService:RideService,
              private mapService : MapService,
              private dialogRef: MatDialogRef<PanicDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
      // TODO : put data in some attribute
    }

  close() : void {
    this.dialogRef.close();
  }

  save() : void {
    let panic = {} as Panic;
    panic.reason = this.message;

    if (this.userService.currentUser!.roles.find(x => x.authority === "ROLE_DRIVER")){
      this.mapService.getDriversActiveRide(this.userService.currentUser!.id).subscribe((res: Ride) => {
        this.rideService.panic(res.id.valueOf(), panic).subscribe(() => {});
      });
      }
    else if(this.userService.currentUser!.roles.find(x => x.authority === "ROLE_PASSENGER")){
        this.mapService.getPassengersActiveRide(this.userService.currentUser!.id).subscribe((res: Ride) => {
        this.rideService.panic(res.id.valueOf(), panic).subscribe(() => {});
      });
    }
  this.dialogRef.close();
  }
}
