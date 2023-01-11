import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'fav-ride-dialog',
  templateUrl: './favorite-ride-dialog.component.html',
  styleUrls: ['./favorite-ride-dialog.component.css']
})
export class FavoriteRideDialogComponent {
  message = "";
  constructor(private _snackBar: MatSnackBar, private dialogRef: MatDialogRef<FavoriteRideDialogComponent>) {}

  close() : void {
    this.dialogRef.close();
  }

  save() : void {
    this.message = this.message.trim();
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
}