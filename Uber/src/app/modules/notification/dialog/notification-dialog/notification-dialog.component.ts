import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message, Ride } from 'src/app/domains';
import { RideService } from 'src/app/modules/home/service/ride.service';
import { UserService } from 'src/app/modules/list-of-users/user.service';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css']
})
export class NotificationDialogComponent implements OnInit{
  user: string = "";
  message: Message = {} as Message;

  constructor(private rideService: RideService,
              private userService: UserService,
              private dialogRef: MatDialogRef<NotificationDialogComponent>,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) data: Message) {
      this.message = data;
    }
  ngOnInit(): void {
    this.whoIsUser();
  }

  close() : void {
    this.dialogRef.close();
  }

  accept() : void {
    this.rideService.accept(this.message.rideId).subscribe((res: Ride) => {
        this.dialogRef.close();
        this.openSnackBar("Successfully accepted!");
    }, (error: HttpErrorResponse) => {
      this.openSnackBar("Error occured while ride acceptance!");
      return false;
    });
  }

  openSnackBar(snackMsg : string) : void {
    this.snackBar.open(snackMsg, "Dismiss", {
      duration: 4000
    });
  }

  whoIsUser(): string {
		if(this.userService.currentUser?.roles != undefined) {
			if(this.userService.currentUser?.roles.find(x => x.authority === "ROLE_PASSENGER")) 
				return this.user = "passenger";
			else if(this.userService.currentUser?.roles.find(x => x.authority === "ROLE_DRIVER")) 
				return this.user = "driver";
			else if(this.userService.currentUser?.roles.find(x => x.authority === "ROLE_ADMIN")) 
			return this.user = "admin";
		}
		return this.user = "none";
	}
}
