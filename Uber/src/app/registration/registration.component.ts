import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{
    registrationForm= new FormGroup({
    name: new FormControl(),
    lastname: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    passwordAgain: new FormControl(),
    phone: new FormControl(),
    postalAddress: new FormControl(),
  }) ;

  constructor() {}

  ngOnInit(): void {
      
  }

  registrate() {
    // implement registration here
  }

  

}
