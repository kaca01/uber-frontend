import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FavoriteRideRequest, RideRequest, Route } from 'src/app/domains';
import { OrderDetailsDialog } from '../order-details-dialog/order-details-dialog';
import { RideService } from '../service/ride.service';

@Component({
  selector: 'fav-ride-dialog',
  templateUrl: './favorite-ride-dialog.component.html',
  styleUrls: ['./favorite-ride-dialog.component.css']
})
export class FavoriteRideDialogComponent {
  name = "";
  private orderDetails: OrderDetailsDialog = {} as OrderDetailsDialog;
  constructor(private rideService: RideService, 
    private _snackBar: MatSnackBar, private dialogRef: MatDialogRef<FavoriteRideDialogComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
      this.orderDetails = data;
    }

  close() : void {
    this.dialogRef.close();
  }

  save() : void {
    this.name = this.name.trim();
    if(this.name != '') {
      this.orderDetails.addFavoriteLocation(this.name);
      this.openSnackBar("Successfully added!");
    }
    else
      this.openSnackBar("Name should not be empty!");
      
    this.dialogRef.close();
  }

  onDeparture() : void {
    this.dialogRef.close(1);
  }

  onDestination() : void {
    this.dialogRef.close(2);
  }

  openSnackBar(snackMsg : string) : void {
    this._snackBar.open(snackMsg, "Dismiss", {
      duration: 2000
    });
  }

  // addFavoriteLocation() {
  //   this.orderDetails.convertEmailsToUsers();
  //   this.setRoute();
  //   console.log("ROUTEEEE");
  //   console.log(this.orderDetails.route);
    
  //   let favoriteRide : FavoriteRideRequest = {} as FavoriteRideRequest;
  //   console.log("ROUTEEEE2");
  //   console.log(this.orderDetails.route);
  //   favoriteRide["favoriteName"] = this.name;
  //   favoriteRide["passengers"] = this.orderDetails.users;
    
  //   favoriteRide["babyTransport"] = this.orderDetails.babies;
  //   favoriteRide["petTransport"] = this.orderDetails.pets;

  //   favoriteRide["vehicleType"] = this.orderDetails.getVehicleType();
  //   if (favoriteRide["vehicleType"] == "") return;

  //   console.log("ROUTEEEE3");
  //   console.log(this.orderDetails.route);
  //   let locations : Route[] = [this.orderDetails.route];

  //   favoriteRide["locations"] = locations;

  //   console.log("FAVORITE ORDERRR");
  //   console.log(favoriteRide);

  //   this.rideService.addFavorite(favoriteRide)
  //   .subscribe(
  //     (res: any) => {
  //   },
  //     (error: HttpErrorResponse) => {
  //       this.openSnackBar("Error occured!");
  //     }
  //   );
  // }

  // delay(ms: number) {
  //   return new Promise( resolve => setTimeout(resolve, ms) );
  // }

  // async setRoute() {
  //   this.orderDetails.setDeparture();
  //   this.orderDetails.setDestination();
  //   await this.delay(5000);
  //   this.orderDetails.route["departure"] = this.orderDetails.departureLocation;
  //   this.orderDetails.route["destination"] = this.orderDetails.destinationLocation;
  // }


}