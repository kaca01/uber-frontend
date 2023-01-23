import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/modules/list-of-users/user.service';
import { HttpErrorResponse } from "@angular/common/http";
import {MatSnackBar} from '@angular/material/snack-bar';
import { ResetPassword } from 'src/app/domains';
import { Router } from '@angular/router'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  
  resetPassword = {} as ResetPassword;

  resetPasswordForm = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
  });

  constructor(private userService : UserService, private _snackBar: MatSnackBar, private router: Router,
    private dialogRef: MatDialogRef<ResetPasswordComponent>) {}

  close() : void {
    this.dialogRef.close();
  }

  save() : void {
    if(this.resetPasswordForm.controls['newPassword'].value != '' && 
        this.resetPasswordForm.controls['code'].value != '') {

          this.resetPassword['newPassword'] = this.resetPasswordForm.controls['newPassword']?.value!;
          this.resetPassword['code'] = this.resetPasswordForm.controls['code']?.value!;

          this.userService.resetPassword(this.userService.currentUser?.id!, this.resetPassword)
      .subscribe(
        (res: any) => {
        this.openSnackBar("Successfully reset password!");
        this.router.navigate(['login']);
      },
        (error: HttpErrorResponse) => {
          this.openSnackBar("Code is expired or not correct!");
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