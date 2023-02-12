import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/modules/list-of-users/user.service';
import { AuthService } from '../../auth/services/auth.service';
import { HttpErrorResponse } from "@angular/common/http";
import {MatSnackBar} from '@angular/material/snack-bar';
import { ChangePassword } from 'src/app/domains';
import { Router } from '@angular/router'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  
  changePassword = {} as ChangePassword;

  changePasswordForm = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
    oldPassword: new FormControl('', [Validators.required]),
  });

  hideNew: boolean = true;
  hideOld: boolean = true;

  constructor(private userService : UserService, private _snackBar: MatSnackBar, private router: Router,
    private dialogRef: MatDialogRef<ChangePasswordComponent>, private authService : AuthService) {}

  close() : void {
    this.dialogRef.close();
  }

  save() : void {
    if(this.changePasswordForm.controls['newPassword'].value != '' && 
        this.changePasswordForm.controls['oldPassword'].value != '') {

          this.changePassword['newPassword'] = this.changePasswordForm.controls['newPassword']?.value!;
          this.changePassword['oldPassword'] = this.changePasswordForm.controls['oldPassword']?.value!;

          this.userService.changePassword(this.userService.currentUser?.id!, this.changePassword)
      .subscribe(
        (res: void) => {
        this.openSnackBar("Successfully changed password!");
        this.authService.logout();
        this.router.navigate(['login']);
      },
        (error: HttpErrorResponse) => {
          this.openSnackBar("Current password is not matching!");
      })
      this.dialogRef.close();
    }
  }

  openSnackBar(snackMsg : string) : void {
    this._snackBar.open(snackMsg, "Dismiss", {
      duration: 2000
    });
  }
}