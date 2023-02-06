import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Ride } from 'src/app/domains';
import { UserService } from '../../list-of-users/user.service';
import { MapService } from '../../map/map.service';
import { RideService } from '../service/ride.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RatingsComponent } from '../../history/ratings/ratings.component';
import { ReviewDialogComponent } from '../../review/review-dialog/review-dialog.component';

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
  hasRide = false;
  private stompClient: any;

  destinationForm = new FormGroup({
    pickup: new FormControl('', [Validators.required]),
    destination: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserService, private mapService: MapService, private router : Router,
    private rideService: RideService, private dialog: MatDialog) {}

  ngOnInit(): void {
    const Menu = document.getElementById("menu-container");
    if(Menu != null) Menu.style.display = 'none';

    const order = document.getElementById("order");
    if(order != null) order.style.display = 'none';

    this.initializeWebSocketConnection();
    this.checkForActiveRide();
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
      if(order != null) {
        order.style.display = 'block';
        this.mapService.sendRoute([this.pickup, this.destination]);
      }
    }
  }

  cancelRide() {
    const startForm = document.getElementById("form");
    if(startForm != null) startForm.style.display = 'block';

    const order = document.getElementById("order");
    if(order != null) order.style.display = 'none';
  }

  checkForActiveRide(){
    this.mapService.getPassengersActiveRide(this.userService.currentUser!.id).subscribe((res: Ride) => {
      if (res != null) {
        const Menu = document.getElementById("form");
        if(Menu != null) Menu.style.display = 'none';
        this.hasRide = true;
        }
      }
    );
  }

  panic(){
    this.rideService.panicButton();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS('http://localhost:8081/socket');
    console.log("connected socket-current");
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = null;
    let that = this;
    this.stompClient.connect({}, function () {
      that.openGlobalSocket();
    });
  }

  openGlobalSocket() {

    this.stompClient.subscribe('/socket-publisher/map-updates/change-page-start', (message: { body: string }) => {
      this.checkForActiveRide();
    });

    this.stompClient.subscribe('/socket-publisher/map-updates/change-page-end', (message: { body: string }) => {
      let ride: Ride = JSON.parse(message.body);
      ride.passengers.forEach( (p) => {
        if (p.email == this.userService.currentUser!.email){
          this.hasRide = false;
          const Menu = document.getElementById("form");
          if(Menu != null) Menu.style.display = 'block';
          this.openReviewDialog();
        }
      }); 
    });
  }
  
  openReviewDialog() {
		const dialogConfig = new MatDialogConfig();
	
		dialogConfig.disableClose = false;
		dialogConfig.autoFocus = true;
	
		this.dialog.open(ReviewDialogComponent, dialogConfig);
	}
}