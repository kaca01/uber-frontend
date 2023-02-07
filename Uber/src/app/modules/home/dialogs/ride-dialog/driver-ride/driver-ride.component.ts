import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PanicRequest, Ride } from 'src/app/domains';
import { UserService } from 'src/app/modules/list-of-users/user.service';
import { RideService } from '../../../service/ride.service';

@Component({
  selector: 'app-driver-ride',
  templateUrl: './driver-ride.component.html',
  styleUrls: ['./driver-ride.component.css']
})
export class DriverRideComponent {
  departure = '';
  destination = '';
  scheduled = '';
  passengersNum = 0;
  babyTransport = false;
  petTransport = false;
  rejection = '';
  rideId = -1;
  public isActiveRide = true;

  constructor (private userService : UserService, private dialogRef: MatDialogRef<DriverRideComponent>,
    private rideService: RideService, private _snackBar: MatSnackBar) {}

    ngOnInit(): void {
      this.rideService.getNextAcceptedRide(this.userService.currentUser!.id).subscribe((ride: Ride) => {
        this.departure = ride.locations[0].departure.address;
        this.destination = ride.locations[0].destination.address;
        this.scheduled = ride.scheduledTime;
        this.passengersNum = ride.passengers.length;
        this.babyTransport = ride.babyTransport;
        this.petTransport = ride.petTransport;
        this.rideId = ride.id;
        if (ride.status=="ACTIVE") this.isActiveRide = true;
        else this.isActiveRide = false;
      });
    }

    close() : void {
      this.dialogRef.close();
    }

    reject() : void {
      if (this.rejection=='') {
        this.openSnackBar("You must give an explanation for rejection!");
        return;
      }
      let panic = {} as PanicRequest;
      panic.reason = this.rejection;
      this.rideService.cancelRide(this.rideId, panic).subscribe((res: Ride) => {
        this.openSnackBar("Ride successfully canceled!");
      });
    }

    openSnackBar(snackMsg : string) : void {
      this._snackBar.open(snackMsg, "Dismiss", {
        duration: 2000
      });
    }
}
