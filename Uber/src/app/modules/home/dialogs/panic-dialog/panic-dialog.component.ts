import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/modules/list-of-users/user.service';
import { PanicService } from 'src/app/modules/notification/service/panic.service';

@Component({
  selector: 'app-panic-dialog',
  templateUrl: './panic-dialog.component.html',
  styleUrls: ['./panic-dialog.component.css']
})
export class PanicDialogComponent {
  message : string = "";
  constructor(private userService : UserService, 
              private _snackBar: MatSnackBar, 
              private dialogRef: MatDialogRef<PanicDialogComponent>,
              private panicService: PanicService,
              @Inject(MAT_DIALOG_DATA) data: any) {
      // TODO : put data in some attribute
    }

  close() : void {
    this.dialogRef.close();
  }

  save() : void {
    this.panicService.sendMessageUsingSocket("You have a new ride request! \nFrom: " + 
     "\nTo: " + "\nSchedule time: ",
     "1", "6",
    6);
    this.dialogRef.close();
  }
}
