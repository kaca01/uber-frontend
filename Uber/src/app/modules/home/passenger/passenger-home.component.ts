import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from '../../list-of-users/user.service';
import { MapService } from '../../map/map.service';

@Component({
  selector: 'passenger-home',
  templateUrl: './passenger-home.component.html',
  styleUrls: ['./passenger-home.component.css'],
})
export class PassengerHomeComponent implements OnInit {
  @Output() newItemEvent1 = new EventEmitter<string>();
  @Output() newItemEvent2 = new EventEmitter<string>();
  @Input() pickup_input = '';
  @Input() destination_input = '';
  pickup = '';
  destination = '';

  price!: number;
  time!: number;
  notification = "";

  destinationForm = new FormGroup({
    pickup: new FormControl('', [Validators.required]),
    destination: new FormControl('', [Validators.required]),
  });

  orderForm = new FormGroup({
    favorite: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserService, private mapService: MapService) {}

  ngOnInit(): void {
    const Menu = document.getElementById("menu-container");
    if(Menu != null) Menu.style.display = 'none';

    const order = document.getElementById("order");
    if(order != null) order.style.display = 'none';
  }

  isLoggedIn(): boolean {
		if(this.userService.currentUser?.name != undefined) 
			return true;
		return false;
	}

  openDialog() : void {
    const Menu = document.getElementById("menu-container");
    if (Menu != null) {
      Menu.style.display = 'none';

      Menu.addEventListener('click', function open(event){
        const Form = document.getElementById("form");
        if (Form != null) Form.style.display = 'block';
        Menu.style.display = 'none';
      });
    }
  }

  closeDialog() : void {
    const Menu = document.getElementById("menu-container");
    const Close = document.getElementById("close-dialog");
    if (Close != null) {
      Close.addEventListener('click', function close(event){
        const Form = document.getElementById("form");
        if (Form != null) {
          Form.style.display = 'none';
          if (Menu != null) Menu.style.display = 'block';
          
        }
      });
    }
  }

  sendLocations() {
      this.newItemEvent1.emit(this.pickup);
      this.newItemEvent2.emit(this.destination); 
  }

  setPickup(): void{
    this.pickup = this.pickup_input;
  }

  setDestination(): void{
    const destElement = document.getElementById("destination_id");
    this.destination = this.destination_input;
  }

  ngOnChanges() { 
    this.setPickup();
    this.setDestination();
  }

  calculateEstimatedValues() {
    if(this.pickup != '' && this.destination != '') {
      this.price = 456;
      this.time = 17;
      this.notification = "";
    }
    else
      this.notification = "Fill all fields!"
  }

  openOrderDetails() {
    if(this.pickup != '' && this.destination != '') {
      const startForm = document.getElementById("form");
      if(startForm != null) startForm.style.display = 'none';

      const order = document.getElementById("order");
      if(order != null) order.style.display = 'block';
    }
  }

  cancelRide() {
    const startForm = document.getElementById("form");
    if(startForm != null) startForm.style.display = 'block';

    const order = document.getElementById("order");
    if(order != null) order.style.display = 'none';
  }

  orderRide() {
    let depratureLat : number = 0;
    let departureLong : number = 0;
    let destinationLat : number = 0;
    let destinationLong : number = 0;
    this.mapService.search(this.pickup).subscribe({
      next: (result) => {
        depratureLat = result[0].lat;
        departureLong = result[0].lon;

        this.mapService.search(this.destination).subscribe({
          next: (result) => {
            destinationLat = result[0].lat;
            destinationLong = result[0].lon;
          }
        });
      }
    });
  }
}