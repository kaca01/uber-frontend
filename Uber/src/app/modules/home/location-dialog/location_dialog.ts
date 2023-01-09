import {Component, Inject } from '@angular/core';
import {MatDialogRef, MatDialogModule, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @title Dialog elements
 */
@Component({
  selector: 'dialog-location',
  templateUrl: './location-dialog.html',
  styleUrls: ['./location-dialog.css'],
})
export class LocationDialog {
  
    constructor(
      public dialogRef: MatDialogRef<LocationDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }

    onClose(): void{
        this.dialogRef.close();
    }

    onDeparture(): void {
        this.dialogRef.close(1);
    }
    
    onDestination(): void{
        this.dialogRef.close(2);
    }

  }

