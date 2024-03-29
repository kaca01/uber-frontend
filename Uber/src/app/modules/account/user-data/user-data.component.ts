import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateUser, User } from 'src/app/domains';
import { UserService } from 'src/app/modules/list-of-users/user.service';
import { ChangesDialogComponent } from '../dialogs/changes-dialog/changes-dialog.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  name: string = "";
  surname: string = "";
  email: string = "";
  phone: string = "";
  address: string = "";

  private updateUser = {} as UpdateUser;

  editForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', []),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required])
  });

  constructor(private userService: UserService, private _snackBar: MatSnackBar, private dialog: MatDialog) {}
  
  ngOnInit(): void { 
    if(this.userService.currentUser != undefined) {
      this.name = this.userService.currentUser.name;
      this.surname = this.userService.currentUser.surname;
      this.email = this.userService.currentUser.email;
      this.phone = this.userService.currentUser.telephoneNumber;
      this.address = this.userService.currentUser.address;

      this.editForm.controls['name'].setValue(this.name);
      this.editForm.controls['surname'].setValue(this.surname);
      this.editForm.controls['email'].setValue(this.email);
      this.editForm.controls['phone'].setValue(this.phone);
      this.editForm.controls['address'].setValue(this.address);
    }
  }

  openEditDialog() {
    if(this.editForm.controls['name'].value != '' && 
        this.editForm.controls['surname'].value != '' &&
        this.editForm.controls['phone'].value != '' &&
        this.editForm.controls['address'].value != '') {
          
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = this;

        const dialogRef = this.dialog.open(ChangesDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
          if(result.event == 'Edit') {
            if(this.userService.currentUser?.roles.find(x => x.authority === "ROLE_PASSENGER")) {
              this.updatePassenger();
              this.openSnackBar("Your changes are saved!");
            }
            else {
              this.updateDriver();
              this.openSnackBar("Your request has been sent!");
            }
          }
        })
      }
  }

  updatePassenger() {
    if(this.userService.currentUser != undefined) {
      this.updateUser.name = this.editForm.get('name')?.value!;
      this.updateUser.surname = this.editForm.get('surname')?.value!;
      this.updateUser.address = this.editForm.get('address')?.value!;
      this.updateUser.telephoneNumber = this.editForm.get('phone')?.value!;
      this.updateUser.email = this.editForm.get('email')?.value!;
      this.updateUser.profilePicture = this.userService.currentUser.profilePicture;

      this.userService.updatePassenger(this.userService.currentUser.id, this.updateUser).subscribe((res: User) => {
        this.userService.currentUser!.name = res.name;
        this.userService.currentUser!.surname = res.surname;
        this.userService.currentUser!.address = res.address;
        this.userService.currentUser!.telephoneNumber = res.telephoneNumber;
      });
    }
  }

  updateDriver() {
    if(this.userService.currentUser != undefined) {
      this.updateUser.name = this.editForm.get('name')?.value!;
      this.updateUser.surname = this.editForm.get('surname')?.value!;
      this.updateUser.address = this.editForm.get('address')?.value!;
      this.updateUser.telephoneNumber = this.editForm.get('phone')?.value!;
      this.updateUser.email = this.editForm.get('email')?.value!;
      this.updateUser.profilePicture = this.userService.currentUser.profilePicture;

      this.userService.addChanges(this.userService.currentUser.id, this.updateUser).subscribe();
    }
  }

  openSnackBar(snackMsg : string) : void {
    this._snackBar.open(snackMsg, "Dismiss", {
      duration: 2000
    });
  }

  openChangePasswordDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this;

    this.dialog.open(ChangePasswordComponent, dialogConfig);
  }
}