import { Component } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-changes-dialog',
  templateUrl: './changes-dialog.component.html',
  styleUrls: ['./changes-dialog.component.css']
})
export class ChangesDialogComponent {

  constructor(private dialogRef: MatDialogRef<ChangesDialogComponent>) { }

  close() : void {
    this.dialogRef.close({event:'Cancel'});
  }

  save() : void {
    this.dialogRef.close({event:'Edit'});
  }

  onDeparture() : void {
    this.dialogRef.close(1);
  }

  onDestination() : void {
    this.dialogRef.close(2);
  }
}
