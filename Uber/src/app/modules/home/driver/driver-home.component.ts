import { Component, OnInit } from '@angular/core';
import { Driver, Ride } from 'src/app/domains';
import { UserService } from '../../list-of-users/user.service';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MapService } from '../../map/map.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RideService } from '../service/ride.service';
import { AuthService } from '../../auth/services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RideDetailsComponent } from '../../history/ride-details/ride-details.component';
import { DriverRideComponent } from '../dialogs/ride-dialog/driver-ride/driver-ride.component';

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css']
})
export class DriverHomeComponent implements OnInit{
  private active: boolean = true;
  hasRide = false;

  constructor (private userService : UserService, private _snackBar: MatSnackBar, private mapService: MapService,
    private rideService: RideService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.checkForActiveRide();
  }

    changeActivity(){
    const button = document.getElementById("activity-btn");
    if (button?.innerText == "ACTIVE"){
      if (this.hasRide) {
        this.openSnackBar("Cannot change activity while having active ride!");
          return;
      }
      this.userService.logoutDriver(this.userService.currentUser!.id).subscribe((res: Driver) => {
        button.innerText = "INACTIVE";
        button.style.color = "red";
        this.active = false;
      });
    }
    else if (button?.innerText == "INACTIVE"){
      this.mapService.setDriverToActive(this.userService.currentUser!.id).subscribe((res: Driver) => {
        button.innerText = "ACTIVE";
        button.style.color = "black";
        this.active = true;
      });
    }
  }

  changeRideStatus(){
    const button = document.getElementById("ride-btn");
    if (button?.innerText == "START RIDE"){
      if (!this.active) {
        this.openSnackBar("Cannot start ride if your activity status is 'inactive'");
          return;
      }
      this.mapService.getNextRide(this.userService.currentUser!.id).subscribe((ride: Ride) => {
        if (ride == null){
          this.openSnackBar("No scheduled rides for next 5 minutes.");
          return;
        }
        this.mapService.startRide(ride.id).subscribe((res: Ride) => {
          button.innerText = "END RIDE";
          this.hasRide = true;
          button.style.backgroundColor = "#209538";
        });
      });
    }
    else if (button?.innerText == "END RIDE"){
      this.mapService.getDriversActiveRide(this.userService.currentUser!.id).subscribe((ride: Ride) => {
        this.mapService.endRide(ride.id).subscribe((res: any) => {
          button.innerText = "START RIDE";
          button.style.backgroundColor = "#395099";
          this.hasRide = false;
        });
      });
    }
  }

  openRideDetails(){
    this.rideService.getNextAcceptedRide(this.userService.currentUser!.id).subscribe((res: Ride) => {
      if (res == null){
        this.openSnackBar("No scheduled rides!");
        return;
      }
      const dialogConfig = new MatDialogConfig();
      
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      this.dialog.open(DriverRideComponent, dialogConfig);
    })
  }

  checkForActiveRide(){
    const button = document.getElementById("ride-btn");
    this.mapService.getDriversActiveRide(this.userService.currentUser!.id).subscribe((res: Ride) => {
      if (res != null) {
        button!.innerText = "END RIDE";
        this.hasRide = true;
        button!.style.backgroundColor = "#209538";
        }
      }
    );
  }

  panic(){
    this.rideService.panicButton();
  }

  openSnackBar(snackMsg : string) : void {
    this._snackBar.open(snackMsg, "Dismiss", {
      duration: 2000
    });
  }
}