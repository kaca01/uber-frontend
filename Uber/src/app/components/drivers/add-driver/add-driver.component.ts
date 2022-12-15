import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})

export class AddDriverComponent implements OnInit{
    addDriverForm= new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
    lastname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+')]),
    postalAddress: new FormControl('', [Validators.required]),
    license: new FormControl('', [Validators.required]),
  }) ;

  hide : boolean = true;

  constructor(private router : Router) {}

  ngOnInit(): void {
      
  }

  addDriver() {
    if (!this.addDriverForm.valid) {
      this.router.navigate(['add-vehicle']);
    }
  }
}
