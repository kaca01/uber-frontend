import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import { DriversComponent } from '../../drivers/drivers.component';

@Component({
  selector: 'app-add-note-dialog',
  templateUrl: './add-note-dialog.component.html',
  styleUrls: ['./add-note-dialog.component.css']
})
export class AddNoteDialogComponent {
  private users = {} as DriversComponent;
  private requestNote = {} as RequestNote;
  message = "";
  constructor(private userService : UserService, private dialogRef: MatDialogRef<AddNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
      this.users = data;
    }

  close() : void {
    this.dialogRef.close();
  }

  save() : void {
    console.log(this.message);
    if(this.message != '') {
      console.log("Printam usera");
      this.requestNote["message"] = this.message;
      console.log(this.users.user.id);
      console.log(this.requestNote);
      this.userService.addNote(this.users.user.id, this.requestNote)
      .subscribe((res: any) => {
      });
    }
    this.dialogRef.close();
  }

  onDeparture() : void {
    this.dialogRef.close(1);
  }

  onDestination() : void {
    this.dialogRef.close(2);
  }
}

export interface RequestNote {
  message: string;
}
