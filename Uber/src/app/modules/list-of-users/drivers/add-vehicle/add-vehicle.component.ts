import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/list-of-users/user.service';
import { Driver, Vehicle, Location } from 'src/app/domains';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})

export class AddVehicleComponent implements OnInit{
    baby = false;
    pet = false;
    selectedValue = null;

    addVehicleForm= new FormGroup({
    model: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    seats: new FormControl('', [Validators.required]),
    licensePlate: new FormControl('', [Validators.required]),
  }) ;

  private driver = history.state.data as Driver;
  private vehicle = {} as Vehicle;

  constructor(private router : Router,  private service: UserService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    let d = history.state.vehicle as Vehicle;
    if (d != undefined) {
      this.addVehicleForm.controls['model'].setValue(d.model.valueOf());
      this.addVehicleForm.controls['seats'].setValue(d.passengerSeats.toString());
      this.addVehicleForm.controls['licensePlate'].setValue(d.licenseNumber.valueOf());
      this.addVehicleForm.controls['type'].setValue(d.vehicleType.valueOf());
      this.pet = d.petTransport.valueOf();
      this.baby = d.babyTransport.valueOf();
    }
  }

  addVehicle() {
    if (this.addVehicleForm.valid) {
      this.service.addDriver(this.driver)
      .subscribe((res: any) => {

        let resJson = JSON.parse(res);
        this.driver.id = resJson["id"];
        this.setVehicle();

        this.service.addVehicle(this.vehicle, this.driver.id )
        .subscribe((res2: any) => {

        this.openSnackBar("Driver and vehicle have been successfully created!");
        this.router.navigate(['drivers']);
      },
        (error) => {             ;
          this.openSnackBar(JSON.parse(error.error).message);
          }
        );
      },
      (error) => {                 
        this.openSnackBar(JSON.parse(error.error).message);
        }
      );
    }
  }

  setVehicle() {
      this.vehicle.model = this.addVehicleForm.get('model')?.value!;
      this.vehicle.vehicleType = this.addVehicleForm.get('type')?.value!;
      this.vehicle.passengerSeats = parseInt(this.addVehicleForm.get('seats')?.value!);
      this.vehicle.licenseNumber = this.addVehicleForm.get('licensePlate')?.value!;
      this.vehicle.babyTransport = this.baby;
      this.vehicle.petTransport = this.pet;
      let l = {} as Location;
      l.address = "Bulevar Oslobodjenja 100";
      l.latitude = 45.244031;
      l.longitude = 19.841495;
      this.vehicle.currentLocation = l;
  }

  goBack() {
    this.setVehicle();
    this.router.navigate(['add-driver'], {state:{data:this.driver, vehicle:this.vehicle}});

  }

   openSnackBar(snackMsg : string) : void {
    this._snackBar.open(snackMsg, "Dismiss", {
      duration: 2000
    });
  }

  types: Type[] = [
    {value: 'STANDARD', viewValue: 'STANDARD'},
    {value: 'LUXURY', viewValue: 'LUXURY'},
    {value: 'VAN', viewValue: 'VAN'},
  ];
}

interface Type {
  value: string;
  viewValue: string;
}
