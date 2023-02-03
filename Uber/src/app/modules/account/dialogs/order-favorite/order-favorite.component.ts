import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { FavoriteRide } from 'src/app/domains';
import { UserService } from 'src/app/modules/list-of-users/user.service';

@Component({
  selector: 'app-order-favorite',
  templateUrl: './order-favorite.component.html',
  styleUrls: ['./order-favorite.component.css']
})
export class OrderFavoriteComponent {

  favoriteRide: FavoriteRide = {} as FavoriteRide;

  constructor(private userService: UserService, 
    private dialogRef: MatDialogRef<OrderFavoriteComponent>, 
    @Inject(MAT_DIALOG_DATA) data: FavoriteRide) {
      this.favoriteRide = data;
  }

  orderRide = new FormGroup({
    time: new FormControl('', [Validators.required]),
  });

  order() {
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
}
