import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/list-of-users/user.service';

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
    telephoneNumber: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+')]),
    address: new FormControl('', [Validators.required]),
  
  }) ;

  hide : boolean = true;
  hideAgain : boolean = true;

  constructor(private router : Router, private service: UserService) {}

  ngOnInit(): void {
      
  }

  reg() {
    if (this.registrationForm.valid) {
      this.service.addPassenger(this.registrationForm.value)
      .subscribe((res: any) => {
        console.log(res);
        this.router.navigate(['home-page']);
      });
    }
  }

  login() {
    this.router.navigate(['login']);
  }

}
