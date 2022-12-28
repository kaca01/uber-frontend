import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notes-dialog',
  templateUrl: './notes-dialog.component.html',
  styleUrls: ['./notes-dialog.component.css']
})
export class NotesDialogComponent {
  notes: Note[] = [];
  description:string = "";
  id: any;
  constructor(private dialogRef: MatDialogRef<NotesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: Note[]) {
      console.log("Printam");
      this.notes = data;
      console.log(this.notes);
    }

    close() : void {
      this.dialogRef.close();
    }

    save() : void {

    }

    onDeparture() : void {
      this.dialogRef.close(1);
    }

    onDestination() : void {
      this.dialogRef.close(2);
    }
}

export interface Note {  
  message: string
}
