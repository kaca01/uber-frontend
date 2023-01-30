import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { COMMA, ENTER, T } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FavoriteRideDialogComponent } from '../favorite-ride-dialog/favorite-ride-dialog.component';
import { MapService } from '../../map/map.service';
import { RideRequest, Location, Route, UserEmail, User, FavoriteRideRequest } from 'src/app/domains';
import { HttpErrorResponse } from '@angular/common/http';
import { RideService } from '../service/ride.service';
import { UserService } from '../../list-of-users/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/services/auth.service';

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
  public users : UserEmail[] = [];
  public babies: boolean = false;
  public pets: boolean = false;
  public departureLocation : Location = {} as Location;
  public destinationLocation : Location = {} as Location;
  public route : Route = {} as Route;
  private validMails = true;
  private validRoute = true;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  emails: String[] = [];
  types: VehicleType[] = [
    {value: 'standard-0', viewValue: 'STANDARD'},
    {value: 'luxury-1', viewValue: 'LUXURY'},
    {value: 'van-2', viewValue: 'VAN'},
  ];

  selectedValue : any;
  pickedTime: any;

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
      this.setRoute();
      return true;
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add email
    if (value) {
      this.emails.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  remove(email: String): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

  edit(email: String, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove email if it no longer has a name
    if (!value) {
      this.remove(email);
      return;
    }

    // Edit existing email
    const index = this.emails.indexOf(email);
    if (index > 0) {
      this.emails[index] = value;
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

  // convertEmailsToUsers() : boolean {
  //   this.users = [];
  //   let userEmail : UserEmail = {} as UserEmail;

  //   if (this.userService.currentUser) {
  //     userEmail.id = this.userService.currentUser.id;
  //     userEmail.email = this.userService.currentUser.email;
  //     this.users.push(userEmail);
  //   }

  //   // await this.delay(5000);
  //   return true;
  // }

  orderRide() {
      // Call the setDelay function again with the remaining times
    // if (!this.convertEmailsToUsers()) return;
    this.validRoute = this.setRoute();
    
    // await this.delay(5000);
    // this list will always have only one element
    // because on front we don't have more than one route

    let locations : Route[] = [this.route];
    
    let rideRequest : RideRequest = {} as RideRequest;
    rideRequest["locations"] = locations;
    rideRequest["passengers"] = this.users;
    
    rideRequest["babyTransport"] = this.babies;
    rideRequest["petTransport"] = this.pets;

    rideRequest["vehicleType"] = this.getVehicleType();
    if (rideRequest["vehicleType"] == "") return;

    rideRequest["scheduledTime"] = this.getScheduledTime();

    if (rideRequest["scheduledTime"] == "") {
      this.openSnackBar("Ride can be ordered only 5 hours in advance!");
      return;
    }

 
    if (this.userService.currentUser != null){
      let linkedPassenger : UserEmail = {} as UserEmail;
      linkedPassenger.id = this.userService.currentUser.id;
      linkedPassenger.email = this.userService.currentUser.email;
      this.users.push(linkedPassenger);
    } 
        
    this.rideService.checkIfInvitedPassengerExists(this.emails).subscribe(
      (res: UserEmail[]) => {
        // linkedPassenger.id = res.id;
        // linkedPassenger.email = res.email;
        console.log("RESSSSSSSSSS");
        console.log(res);
        // this.users.push(linkedPassenger);
        this.validMails = true;
        res.forEach(element => {
          console.log(this.userService.currentUser?.email);
          if (element.email.trim() != this.userService.currentUser?.email){
            let linkedPassenger : UserEmail = {} as UserEmail;
            linkedPassenger.id = element.id;
            linkedPassenger.email = element.email;
            this.users.push(linkedPassenger);
          }
        });
        console.log("USERSSSSSS");
        console.log(this.users);
        rideRequest.passengers = this.users;
        this.rideService.createRide(rideRequest)
        .subscribe(
          (res: any) => {
            this.openSnackBar("Please wait. System is searching for drivers.")
            this.emails = [];
            return true;
        },
          (error: HttpErrorResponse) => {
            this.openSnackBar("Error occured while ordering a ride!");
            this.emails = [];
            return false;
          }
        );
        return true;
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar("Please check if all emails are correct!");
        console.log("ERROR 404");
        console.log(error.message);
        this.validMails = true;
        this.emails = [];
        return false;
    }
    );
  }

  openSnackBar(snackMsg : string) : void {
    this.snackBar.open(snackMsg, "Dismiss", {
      duration: 4000
    });
  }

  getChosenTime() : string {
    let now = new Date();
    // time zone
    now.setHours(now.getHours() + 1);
    now.setMonth(now.getMonth());
    let tomorrow : Date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());
    let hours : number = Number(this.pickedTime.split(':')[0]) + 1;
    let minutes : number = Number(this.pickedTime.split(':')[1]);

    if ((now.getHours() > (hours)) || (now.getHours() == (hours)) && (now.getMinutes() > minutes)) {
      tomorrow.setDate(tomorrow.getDate()+1);
      tomorrow.setHours(hours);
      tomorrow.setMinutes(minutes);
    } else if ((now.getHours() == (hours)) && (now.getMinutes() == minutes)) {
      return new Date().toISOString();
    } else tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

    if (!this.isChosenTimeValid(now, tomorrow)) return "";

    if (tomorrow != undefined)
      return tomorrow.toISOString();
    return "";
  }

  isChosenTimeValid(now: Date, chosenDate: Date) : boolean {
    var diff = (chosenDate.getTime() - now.getTime()) / (60 * 60 * 1000);
    if (diff < 5) return true; 
    return false;
  }

  public setDeparture() : boolean {
    this.mapService.search(this.departure).subscribe(
      (result: any) => {
        let depratureLat : number = Number(result[0].lat);
        let departureLong : number = Number(result[0].lon);
        this.departureLocation.address = this.departure.toString();
        this.departureLocation.latitude = depratureLat;
        this.departureLocation.longitude = departureLong;
        return true;
      } 
    );
    return true;
  }

  public setDestination() : boolean {
    this.mapService.search(this.destination).subscribe(
      (result : any) => {
        let destinationLat : number = Number(result[0].lat);
        let destinationLong : number = Number(result[0].lon);

        this.destinationLocation.address = this.destination.toString();
        this.destinationLocation.latitude = destinationLat;
        this.destinationLocation.longitude = destinationLong;
        return true;
      }
    );

    return true;
  }

  setRoute() : boolean {
    if(!this.setDeparture()) return false;
    if(!this.setDestination()) return false;
    // await this.delay(5000);
    this.route["departure"] = this.departureLocation;
    this.route["destination"] = this.destinationLocation;
    return true;
  }

  getVehicleType() : string {
    if (this.selectedValue == "standard-0") return "STANDARD";
    else if (this.selectedValue == "luxury-1") return "LUXURY";
    else if (this.selectedValue == "van-2") return "VAN";
    else {
      this.openSnackBar("Please select vehicle type!");
      return "";
    }
  }

  getScheduledTime() : string {
    if (this.pickedTime != undefined) {
      return this.getChosenTime();
    }
    let date = new Date();
    date.setHours(date.getHours()+1)
    return date.toISOString();
  }

  // delay(ms: number) {
  //   return new Promise( resolve => setTimeout(resolve, ms) );
  // }

  addFavoriteLocation(name: string) {
    // if(!this.convertEmailsToUsers()) return;
    if(!this.setRoute()) return;

    // await this.delay(5000);

    // this list will always have only one element
    // because on front we don't have more than one route

    let locations : Route[] = [this.route];
    
    let rideRequest : FavoriteRideRequest = {} as FavoriteRideRequest;
    rideRequest["favoriteName"] = name;
    rideRequest["locations"] = locations;
    rideRequest["passengers"] = this.users;
    
    rideRequest["babyTransport"] = this.babies;
    rideRequest["petTransport"] = this.pets;

    rideRequest["vehicleType"] = this.getVehicleType();
    if (rideRequest["vehicleType"] == "") return;

    this.rideService.checkIfInvitedPassengerExists(this.emails).subscribe(
      (res: UserEmail[]) => {
        // linkedPassenger.id = res.id;
        // linkedPassenger.email = res.email;
        console.log("RESSSSSSSSSS");
        console.log(res);
        // this.users.push(linkedPassenger);
        this.validMails = true;
        res.forEach(element => {
          let linkedPassenger : UserEmail = {} as UserEmail;
          linkedPassenger.id = element.id;
          linkedPassenger.email = element.email;
          this.users.push(linkedPassenger);
        });
        console.log("USERSSSSSS");
        console.log(this.users);
        rideRequest.passengers = this.users;
        this.rideService.addFavorite(rideRequest)
        .subscribe(
          (res: any) => {
            return true;
        },  (error: HttpErrorResponse) => {
              this.openSnackBar("Error occured while adding favorite location!");
              console.log("ERROR 404");
              console.log(error.message);
              return false;
          }
        );
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar("Please check if all emails are correct!");
        console.log("ERROR 404");
        console.log(error.message);
        this.validMails = true;
        this.emails = [];
        return false;
    }
    );
  }
}
