import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FavoriteRideDialogComponent } from '../favorite-ride-dialog/favorite-ride-dialog.component';
import { MapService } from '../../map/map.service';
import { RideRequest, Location, Route, UserEmail, User } from 'src/app/domains';
import { HttpErrorResponse } from '@angular/common/http';
import { RideService } from '../service/ride.service';
import { UserService } from '../../list-of-users/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface VehicleType {
  value: string;
  viewValue: string;
}

export interface Email {
  name: string;
}

@Component({
  selector: 'order-details-dialog',
  templateUrl: './order-details-dialog.html',
  styleUrls: ['./order-details-dialog.css'],
})
export class OrderDetailsDialog implements OnInit {
  private departure: string = "";
  private destination: string = "";
  babies = false;
  pets = false;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  emails: Email[] = [];
  types: VehicleType[] = [
    {value: 'standard-0', viewValue: 'STANDARD'},
    {value: 'luxury-1', viewValue: 'LUXURY'},
    {value: 'van-2', viewValue: 'VAN'},
  ];

  selectedValue : any;


  orderForm = new FormGroup({
    vehicleType: new FormControl(''),
    email: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    favorite: new FormControl('', [Validators.required]),
  });
  
  constructor(private dialog: MatDialog, private mapService: MapService, private rideService: RideService,
              private userService: UserService, private snackBar: MatSnackBar) { }
  
  ngOnInit(): void {
    this.mapService.currentMessage.subscribe(message => {
      this.departure = message[0];
      this.destination = message[1];
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add email
    if (value) {
      this.emails.push({name: value});
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  remove(email: Email): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

  edit(email: Email, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove email if it no longer has a name
    if (!value) {
      this.remove(email);
      return;
    }

    // Edit existing email
    const index = this.emails.indexOf(email);
    if (index > 0) {
      this.emails[index].name = value;
    }
  }

  openFavRideDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this;

    this.dialog.open(FavoriteRideDialogComponent, dialogConfig);
  }


  // picker theme
  timePickerTheme: NgxMaterialTimepickerTheme = {
    container: {
        bodyBackgroundColor: '#edebeb',
        buttonColor: '#000'
    },
    dial: {
        dialBackgroundColor: '#96d49c',
    },
    clockFace: {
        clockFaceBackgroundColor: '#96d49c',
        clockHandColor: '#9fbd90',
        clockFaceTimeInactiveColor: '#555'
    }
  };

  convertEmailsToUsers() : UserEmail[] {
    let users : UserEmail[] = [];
    let userEmail : UserEmail = {} as UserEmail;

    if (this.userService.currentUser) {
      userEmail.id = this.userService.currentUser.id;
      userEmail.email = this.userService.currentUser.email;
      users.push(userEmail);
    }

    this.emails.forEach(email => {
      this.rideService.checkIfInvitedPassengerExists(email.name).subscribe(
        (res: UserEmail) => {
          let linkedPassenger : UserEmail = {} as UserEmail;
          linkedPassenger.id = res.id;
          linkedPassenger.email = res.email;
          users.push(linkedPassenger);
        },
        (error: HttpErrorResponse) => {
          // handle error
          console.log("ERROR 404!!!");
          console.log(error.message);
      });
    });

    return users;
  }

  orderRide() {
    this.mapService.search(this.departure).subscribe({
      next: (result) => {
        let depratureLat : number = Number(result[0].lat);
        let departureLong : number = Number(result[0].lon);
        let departureLocation : Location = {} as Location;
        departureLocation.address = this.departure.toString();
        departureLocation.latitude = depratureLat;
        departureLocation.longitude = departureLong;

        this.mapService.search(this.destination).subscribe({
          next: (result) => {
            let destinationLat : number = Number(result[0].lat);
            let destinationLong : number = Number(result[0].lon);

            let destinationLocation : Location = {} as Location;
            destinationLocation.address = this.destination.toString();
            destinationLocation.latitude = destinationLat;
            destinationLocation.longitude = destinationLong;

            let route : Route = {} as Route;
            route["departure"] = departureLocation;
            route["destination"] = destinationLocation;

            // this list will always have only one element
            // because on front we don't have more than one route

            let locations : Route[] = [route];
            
            let rideRequest : RideRequest = {} as RideRequest;
            rideRequest["locations"] = locations;
            rideRequest["passengers"] = this.convertEmailsToUsers();
            if (this.selectedValue == "standard-0") rideRequest["vehicleType"] = "STANDARD";
            else if (this.selectedValue == "luxury-1") rideRequest["vehicleType"] = "LUXURY";
            else if (this.selectedValue == "van-2") rideRequest["vehicleType"] = "VAN";
            else {
              this.openSnackBar("Select vehicle type");
              return;
            }
            rideRequest["vehicleType"] = "STANDARD";
            rideRequest["babyTransport"] = this.babies;
            rideRequest["petTransport"] = this.pets;
            rideRequest["scheduledTime"] = new Date().toISOString();
            console.log("RIDE REQUEST");
            console.log(rideRequest);
            this.rideService.createRide(rideRequest)
            .subscribe(
              (res: any) => {
                this.openSnackBar("Please wait. System is searching for drivers.")
            },
              (error: HttpErrorResponse) => {
                this.openSnackBar("Can't order a ride while you have one already pending!");

            }
          );
            
          }
        });
      }
    });
  }

  openSnackBar(snackMsg : string) : void {
    this.snackBar.open(snackMsg, "Dismiss", {
      duration: 3000
    });
  }
}

