import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PassengerService } from 'src/app/service/passenger.service';

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

  constructor(private router : Router, private service: PassengerService) {}

  ngOnInit(): void {
      
  }

  reg() {
    if (this.registrationForm.valid) {
      this.service.add(this.registrationForm.value)
      .subscribe((res: any) => {
        console.log(res);
        this.router.navigate(['passenger-home']);
      });
    }
  }

  login() {
    this.router.navigate(['login']);
  }

}
