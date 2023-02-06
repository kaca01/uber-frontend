import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PanicRequest, Vehicle } from 'src/app/domains';
import { UserService } from 'src/app/modules/list-of-users/user.service';
import { PanicService } from 'src/app/modules/notification/service/panic.service';
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
  ride: Ride = {} as Ride;
  vehicle: Vehicle = {} as Vehicle;
  panicRequest: PanicRequest = {} as PanicRequest;


  constructor(private userService : UserService, 
              private _snackBar: MatSnackBar, 
              private mapService : MapService,
              private dialogRef: MatDialogRef<PanicDialogComponent>,
              private panicService: PanicService,
              private rideService: RideService,
              @Inject(MAT_DIALOG_DATA) data: any) {
      // TODO : put data in some attribute
    }

  close() : void {
    this.dialogRef.close();
  }

  save() : void {
    if (this.userService.currentUser != undefined) {
      console.log(this.message)
      if(this.userService.currentUser?.roles.find(x => x.authority === "ROLE_PASSENGER")) {
        this.userService.getPassengerActiveRide(this.userService.currentUser.id).subscribe((result : Ride) => {
          this.ride = result;
          this.sendMessage(this.ride.driver.id);
          this.panicRequest.reason = this.message; 
          this.rideService.panic(this.ride.id, this.panicRequest).subscribe((res: Ride) => console.log(res));
        })
      }
      else if(this.userService.currentUser?.roles.find(x => x.authority === "ROLE_DRIVER")) {
        this.userService.getDriverActiveRide(this.userService.currentUser.id).subscribe((result : Ride) => {
          this.ride = result;
          this.sendMessage(this.ride.driver.id);
          this.panicRequest.reason = this.message; 
          this.rideService.panic(this.ride.id, this.panicRequest).subscribe((res: Ride) => console.log(res));
        })
      }
      this.dialogRef.close();
    }
  }

  sendMessage(driverId: number): void {
    this.userService.getVehicle(driverId).subscribe((result : Vehicle) => {
      this.vehicle = result;

      this.panicService.sendMessageUsingSocket(this.userService.currentUser?.name + " " +
        this.userService.currentUser?.surname + " pressed the PANIC button",   
        "\nReason: " + this.message,
        "\nVehicle: " + this.vehicle.licenseNumber);
    })

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
