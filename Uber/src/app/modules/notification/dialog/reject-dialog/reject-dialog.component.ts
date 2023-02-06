import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PanicRequest, Ride, RideRequest, Route } from 'src/app/domains';
import { RideService } from 'src/app/modules/home/service/ride.service';
import { UserService } from 'src/app/modules/list-of-users/user.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-reject-dialog',
  templateUrl: './reject-dialog.component.html',
  styleUrls: ['./reject-dialog.component.css']
})
export class RejectDialogComponent {

  message : string = "";
  rideId: number = 0;
  panicRequest: PanicRequest = {} as PanicRequest;
  rideRequest: RideRequest = {} as RideRequest;
  routes: Route = {} as Route;
  locations: Route[] = [];

  constructor(private rideService : RideService, 
              private notificationService: NotificationService,
              private userService: UserService,
              private dialogRef: MatDialogRef<RejectDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
                this.rideId = data;
  }

  close() : void {
    this.dialogRef.close();
  }

  save() : void {
    this.panicRequest.reason = this.message;
    this.rideService.cancelRide(this.rideId, this.panicRequest).subscribe((res: Ride) => {
      console.log("rejectiooooooooooooon");
      console.log(res)
    });

    // order ride again
    this.rideService.getRide(this.rideId).subscribe((res: Ride) => {
      this.routes.departure = res.locations[0].departure;
      this.routes.destination = res.locations[0].destination;
      
      this.locations.push(this.routes);

      this.rideRequest.locations = this.locations;
      this.rideRequest.passengers = res.passengers;
      this.rideRequest.vehicleType = res.vehicleType;
      this.rideRequest.babyTransport = res.babyTransport;
      this.rideRequest.petTransport = res.petTransport;
      this.rideRequest.scheduledTime = res.scheduledTime;
      console.log("ride request");
      console.log(this.rideRequest);
      this.rideService.createRide(this.rideRequest).subscribe((result: Ride) => {
        console.log("porucivanjeeeeeeee");
        console.log(result);
        if(result.driver == null) 
          this.sendNotification();     
        else
          this.sendAcceptRideNotification(result);
      })
    })
    this.dialogRef.close();
  }

  sendNotification(): void {
    this.rideService.getRide(this.rideId).subscribe((res: Ride) => {
      res.passengers.forEach(passenger => {
        this.notificationService.sendMessageUsingSocket("Sorry, Your ride is rejected! Please try to schedule a ride later.", "From: "+
                                                        res.locations[0].departure.address,
                                                        "To: " + res.locations[0].destination.address,
                                                        "Scheduled time: " + res.scheduledTime.split("T")[0] + " " + res.scheduledTime.split("T")[1],
                                                         "-1", passenger.id.toString(), res.id);
      });
    })
  }

  sendAcceptRideNotification(rideRequest: Ride): void {
    this.notificationService.sendMessageUsingSocket("You have a new ride request!", "From: " + 
                                                    rideRequest.locations[0].departure.address, "To: " +
                                                    rideRequest.locations[0].destination.address,
                                                    "Schedule time: " + rideRequest.scheduledTime,
                                                    this.userService.currentUser!.id.toString(),
                                                    rideRequest.driver.id.toString(), rideRequest.id);
  }

  sendRejectNotification(): void {
    this.rideService.getRide(this.rideId).subscribe((res: Ride) => {
      res.passengers.forEach(passenger => {
        this.notificationService.sendMessageUsingSocket("Your ride is rejected! Please try to schedule a ride later.", "From: "+
                                                        res.locations[0].departure.address,
                                                        "To: " + res.locations[0].destination.address,
                                                        "Scheduled time: " + res.scheduledTime.split("T")[0] + " " + res.scheduledTime.split("T")[1],
                                                         "-1", passenger.id.toString(), res.id);
      });
    })
  }
}
