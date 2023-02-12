import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/list-of-users/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/domains';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{
    registrationForm= new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
    surname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required]),
    telephoneNumber: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+')]),
    address: new FormControl('', [Validators.required]),
  
  }) ;

  hide : boolean = true;
  hideAgain : boolean = true;
  notification!: DisplayMessage;

  constructor(private router : Router, private service: UserService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
      
  }

  reg() {
    if (this.registrationForm.valid) {
      if (this.registrationForm.get('password')?.value! !== this.registrationForm.get('repeatPassword')?.value!) {
        this.openSnackBar("Password is not matching!");
        return;
      }
      this.service.addPassenger(this.registrationForm.value)
      .subscribe((res: User) => {
        console.log(res);
        this.notification = {msgType: 'activation', msgBody: 'Please visit your email address to activate your account!'};
      },
      (error) => {                 
        this.handleErrors(error);
        }
      );
    }
  }

  login() {
    this.router.navigate(['login']);
  }

  handleErrors(error: any) {
    let e = JSON.parse(error.error);
    if(e.message!= null || e.message != undefined)  
    this.openSnackBar(e.message);
    else if(e.errors != null || e.errors != undefined)
    this.openSnackBar(e.errors);
    else this.openSnackBar("Some error occurred");
  }

  openSnackBar(snackMsg : string) : void {
    this._snackBar.open(snackMsg, "Dismiss", {
      duration: 2000
    });
  }

}

interface DisplayMessage {
  msgType: string;
  msgBody: string;
}
