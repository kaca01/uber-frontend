import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DriverService } from 'src/app/service/driver.service';
import { PassengerService } from 'src/app/service/passenger.service';
import { DriversComponent } from '../../drivers/drivers.component';

@Component({
  selector: 'app-add-note-dialog',
  templateUrl: './add-note-dialog.component.html',
  styleUrls: ['./add-note-dialog.component.css']
})
export class AddNoteDialogComponent {
  private drivers = {} as DriversComponent;
  private requestNote = {} as RequestNote;
  message = "";
  constructor(private dialogRef: MatDialogRef<AddNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
      this.drivers = data;
    }

  close() : void {
    this.dialogRef.close();
  }

  save() : void {
    console.log("Printam message");
    console.log(this.message);
    if(this.message != '') {
      this.requestNote["message"] = this.message;
      console.log("driver");
      console.log(this.drivers.driver.id);
      console.log("req note");
      console.log(this.requestNote)
      this.drivers.driverService.addNote(this.drivers.driver.id, this.requestNote)
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
