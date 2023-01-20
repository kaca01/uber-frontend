import { Component, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from 'src/app/domains';

@Component({
  selector: 'app-changes-dialog',
  templateUrl: './changes-dialog.component.html',
  styleUrls: ['./changes-dialog.component.css']
})
export class ChangesDialogComponent {
  notes: Note[] = [];
  description:string = "";
  id: any;

  constructor(private dialogRef: MatDialogRef<ChangesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: Note[]) {
      this.notes = data;
    }

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
