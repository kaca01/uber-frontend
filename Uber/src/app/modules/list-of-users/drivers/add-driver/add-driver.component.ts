import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Driver, Vehicle } from 'src/app/domains';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})

export class AddDriverComponent implements OnInit{
    addDriverForm= new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
    surname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required]),
    telephoneNumber: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+')]),
    address: new FormControl('', [Validators.required]),
    drivingLicense: new FormControl('', [Validators.required]),
  }) ;

  hide : boolean = true;
  hideAgain : boolean = true;
  private driver = {} as Driver;

  constructor(private router : Router, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    let d = history.state.data as Driver;
    if (d != undefined) {
      this.addDriverForm.controls['name'].setValue(d.name.valueOf());
      this.addDriverForm.controls['surname'].setValue(d.surname.valueOf());
      this.addDriverForm.controls['email'].setValue(d.email.valueOf());
      this.addDriverForm.controls['telephoneNumber'].setValue(d.telephoneNumber.valueOf());
      this.addDriverForm.controls['address'].setValue(d.address.valueOf());
      this.addDriverForm.controls['drivingLicense'].setValue(d.drivingLicense.valueOf());
    }
  }

  addDriver() {
    if (this.addDriverForm.valid) {
      if (this.addDriverForm.get('password')?.value! !== this.addDriverForm.get('repeatPassword')?.value!) {
        this.openSnackBar("Password is not matching!");
        return;
      }
      this.driver.name = this.addDriverForm.get('name')?.value!;
      this.driver.surname = this.addDriverForm.get('surname')?.value!;
      this.driver.address = this.addDriverForm.get('address')?.value!;
      this.driver.telephoneNumber = this.addDriverForm.get('telephoneNumber')?.value!;
      this.driver.email = this.addDriverForm.get('email')?.value!;
      this.driver.password = this.addDriverForm.get('password')?.value!;
      this.driver.drivingLicense = this.addDriverForm.get('drivingLicense')?.value!;
      let v = history.state.vehicle as Vehicle;
      this.router.navigate(['add-vehicle'], {state:{data:this.driver, vehicle:v}});
    }
  }

  openSnackBar(snackMsg : string) : void {
    this._snackBar.open(snackMsg, "Dismiss", {
      duration: 2000
    });
  }
}
