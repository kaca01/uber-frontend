import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { FavoriteRide, PanicRequest, Ride, RideRequest, Route, UserEmail } from 'src/app/domains';
import { RideService } from 'src/app/modules/home/service/ride.service';
import { UserService } from 'src/app/modules/list-of-users/user.service';
import { NotificationService } from 'src/app/modules/notification/service/notification.service';

@Component({
  selector: 'app-order-favorite',
  templateUrl: './order-favorite.component.html',
  styleUrls: ['./order-favorite.component.css']
})
export class OrderFavoriteComponent {

  favoriteRide: FavoriteRide = {} as FavoriteRide;
  rideRequest: RideRequest = {} as RideRequest;
  users: UserEmail[] = [];
  route: Route = {} as Route;
  locations: Route[] = [];
  private cancel: PanicRequest = {} as PanicRequest;

  pickedTime: any;

  constructor(private userService: UserService, 
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<OrderFavoriteComponent>,
              private rideService: RideService,
              private notificationService: NotificationService, 
              @Inject(MAT_DIALOG_DATA) data: FavoriteRide) {

    this.favoriteRide = data;
  }

  orderRide = new FormGroup({
    pickedTime: new FormControl('', [Validators.required]),
  });

  order() {
    this.orderRideMethod();
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
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

  orderRideMethod() {
    this.route.departure = this.favoriteRide.locations[0].departure;
    this.route.destination = this.favoriteRide.locations[0].destination;
    this.locations.push(this.route);

    this.rideRequest.locations = this.locations;
    this.rideRequest.passengers = this.favoriteRide.passengers;  
    this.rideRequest.babyTransport = this.favoriteRide.babyTransport;
    this.rideRequest.petTransport = this.favoriteRide.petTransport;
    this.rideRequest.vehicleType = this.favoriteRide.vehicleType
    this.rideRequest.scheduledTime = this.getScheduledTime();
    console.log("ride request")
    console.log(this.rideRequest)

    console.log("favorite ride")
    console.log(this.favoriteRide)
    if (this.rideRequest.scheduledTime == "") {
      this.openSnackBar("Ride can be ordered only 5 hours in advance!");
      return;
    }
    
    // samo on je putnik
    if (this.userService.currentUser != null){
      let linkedPassenger : UserEmail = {} as UserEmail;
      linkedPassenger.id = this.userService.currentUser.id;
      linkedPassenger.email = this.userService.currentUser.email;
      this.users.push(linkedPassenger);
    } 

    // order ride
    this.rideRequest.passengers = this.users;
    console.log("rideeeeeeeeeee");
    console.log(this.rideRequest);
    this.rideService.createRide(this.rideRequest)
    .subscribe(
      (res: Ride) => {
        this.openSnackBar("Please wait. System is searching for drivers.")
        this.rideService.getRide(res.id).subscribe((result: Ride) => {
          if(result.driver == null) this.sendNotification(result);
          else {
            if (this.userService.currentUser != undefined) {
              this.notificationService.sendMessageUsingSocket("You have a new ride request!", "From: " + 
                                                              this.rideRequest.locations[0].departure.address, "To: " +
                                                              this.rideRequest.locations[0].destination.address,
                                                              "Schedule time: " + res.scheduledTime,
                                                                this.userService.currentUser.id.toString(),
                                                              res.driver.id.toString(), res.id);
            }
          }
          this.users = [];
          return true;
        })   
    },
      (error: HttpErrorResponse) => {
        this.openSnackBar("Error occured while ordering a ride!");
        this.users = [];
        return false;
      }
    );
    return true;
  }

  openSnackBar(snackMsg : string) : void {
    this.snackBar.open(snackMsg, "Dismiss", {
      duration: 4000
    });
  }

  getScheduledTime() : string {
    if (this.pickedTime != undefined) {
      console.log("uslo")
      return this.getChosenTime();
    }
    let date = new Date();
    date.setHours(date.getHours()+1)
    return date.toISOString();
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

  sendNotification(res: Ride): void {
    res.passengers.forEach(passenger => {
      this.notificationService.sendMessageUsingSocket("Sorry, Your ride is rejected! Please try to order a ride later.", "From: "+
                                                      res.locations[0].departure.address,
                                                      "To: " + res.locations[0].destination.address,
                                                      "Scheduled time: " + res.scheduledTime.split("T")[0] + " " + res.scheduledTime.split("T")[1],
                                                        "-1", passenger.id.toString(), res.id);
    });
    this.cancel.reason = "cancel by system";
    this.rideService.passengerCancelRide(res.id, this.cancel).subscribe((res: Ride) => {
      console.log("rejectiooooooooooooon");
      console.log(res)
    });
  }
}
