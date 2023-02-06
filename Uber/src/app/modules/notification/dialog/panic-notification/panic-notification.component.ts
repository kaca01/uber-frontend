import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Panic } from 'src/app/domains';
import { UserService } from 'src/app/modules/list-of-users/user.service';
import { PanicService } from '../../service/panic.service';

@Component({
  selector: 'app-panic-notification',
  templateUrl: './panic-notification.component.html',
  styleUrls: ['./panic-notification.component.css']
})
export class PanicNotificationComponent {
  user: string = "";
  panic: Panic = {} as Panic;
  message: string = "";

  constructor(private userService: UserService,
              private dialogRef: MatDialogRef<PanicNotificationComponent>,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) data: Panic) {
      this.panic = data;
    }
    
  ngOnInit(): void {
    this.whoIsUser();
  }

  close() : void {
    this.dialogRef.close();
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
