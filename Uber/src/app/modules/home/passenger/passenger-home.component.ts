import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderDetailsDialog } from '../order-details-dialog/order-details-dialog';

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

  orderForm = new FormGroup({
    pickup: new FormControl('', [Validators.required]),
    destination: new FormControl('', [Validators.required]),
  });

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    const Menu = document.getElementById("menu-container");
    if(Menu != null) Menu.style.display = 'none';
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

  openOrderDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this;

    if(this.pickup != '' && this.destination != '')
      this.dialog.open(OrderDetailsDialog, dialogConfig);
  }
}