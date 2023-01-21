import { Component, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UpdateUser, User } from 'src/app/domains';
import { UserService } from '../../user.service';

@Component({
  selector: 'driver-changes',
  templateUrl: './driver-changes.component.html',
  styleUrls: ['./driver-changes.component.css']
})
export class DriverChangesComponent {
  editDriver: User = {} as User;
  updateUser: UpdateUser = {} as UpdateUser;

  constructor(private userService: UserService, 
    private dialogRef: MatDialogRef<DriverChangesComponent>,
    @Inject(MAT_DIALOG_DATA) data: User) {
      this.editDriver = data;
    }

  close() : void {
    this.dialogRef.close({event:'Later'});
  }

  save() : void {
    this.updateUser.name = this.editDriver.name;
    this.updateUser.surname = this.editDriver.surname;
    this.updateUser.address = this.editDriver.address;
    this.updateUser.telephoneNumber = this.editDriver.telephoneNumber;
    this.updateUser.email = this.editDriver.email;
    this.updateUser.profilePicture = this.editDriver.profilePicture;

    this.userService.updateDriver(this.editDriver.id, this.updateUser).subscribe();

    this.dialogRef.close({event:'Accept'});
  }

  onDeparture() : void {
    this.dialogRef.close(1);
  }

  onDestination() : void {
    this.dialogRef.close(2);
  }
}
