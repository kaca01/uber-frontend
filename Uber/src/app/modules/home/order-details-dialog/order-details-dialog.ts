import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FavoriteRideDialogComponent } from '../favorite-ride-dialog/favorite-ride-dialog.component';
import { MapService } from '../../map/map.service';

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
  selectedValue!: string;
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

  orderForm = new FormGroup({
    vehicleType: new FormControl(''),
    email: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    favorite: new FormControl('', [Validators.required]),
  });
  
  constructor(private dialog: MatDialog, private mapService: MapService) { }
  
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

  orderRide() {
    let depratureLat : number = 0;
    let departureLong : number = 0;
    let destinationLat : number = 0;
    let destinationLong : number = 0;
    this.mapService.search(this.departure).subscribe({
      next: (result) => {
        depratureLat = result[0].lat;
        departureLong = result[0].lon;

        this.mapService.search(this.destination).subscribe({
          next: (result) => {
            destinationLat = result[0].lat;
            destinationLong = result[0].lon;

          }
        });
      }
    });
  }
}

