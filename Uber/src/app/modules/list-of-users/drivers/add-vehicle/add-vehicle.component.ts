import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  hide : boolean = true;

  constructor(private router : Router) {}

  ngOnInit(): void {
      
  }

  types: Type[] = [
    {value: 'standard-0', viewValue: 'STANDARD'},
    {value: 'luxury-1', viewValue: 'LUXURY'},
    {value: 'van-2', viewValue: 'VAN'},
  ];

  addVehicle() {
    if (this.addVehicleForm.valid) {
      this.router.navigate(['drivers']);
    }
  }
}

interface Type {
  value: string;
  viewValue: string;
}
