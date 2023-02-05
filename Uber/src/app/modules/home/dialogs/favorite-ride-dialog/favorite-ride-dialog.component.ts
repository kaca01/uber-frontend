import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FavoriteRideRequest, RideRequest, Route } from 'src/app/domains';
import { OrderDetailsDialog } from '../order-details-dialog/order-details-dialog';
import { RideService } from '../../service/ride.service';

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
      if (this.orderDetails.getVehicleType() != ""){  
        this.orderDetails.addFavoriteLocation(this.name);
        this.openSnackBar("Successfully added!");
      }
    }
    else
      this.openSnackBar("Name should not be empty!");
      
    this.dialogRef.close();
  }

  openSnackBar(snackMsg : string) : void {
    this._snackBar.open(snackMsg, "Dismiss", {
      duration: 2000
    });
  }
}