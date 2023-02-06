import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ride, Vehicle } from 'src/app/domains';
import { UserService } from 'src/app/modules/list-of-users/user.service';
import { PanicService } from 'src/app/modules/notification/service/panic.service';

@Component({
  selector: 'app-panic-dialog',
  templateUrl: './panic-dialog.component.html',
  styleUrls: ['./panic-dialog.component.css']
})
export class PanicDialogComponent {

  message : string = "";
  ride = {} as Ride;
  vehicle = {} as Vehicle;

  constructor(private userService : UserService, 
              private _snackBar: MatSnackBar, 
              private dialogRef: MatDialogRef<PanicDialogComponent>,
              private panicService: PanicService,
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
          console.log("passenger")
          console.log(this.ride)
          this.sendMessage(this.ride.driver.id);
        })
      }
      else if(this.userService.currentUser?.roles.find(x => x.authority === "ROLE_DRIVER")) {
        this.userService.getDriverActiveRide(this.userService.currentUser.id).subscribe((result : Ride) => {
          this.ride = result;
          console.log("driver")
          console.log(this.ride)
          this.sendMessage(this.ride.driver.id);
        })
      }

      // todo pozovi api za panic, da se upise u bazu
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
  }
}
