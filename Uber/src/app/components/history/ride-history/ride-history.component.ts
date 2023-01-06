import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoryService } from 'src/app/service/history.service';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  selector: 'app-ride-history',
  templateUrl: './ride-history.component.html',
  styleUrls: ['./ride-history.component.css']
})
export class RideHistoryComponent implements OnInit {
  all : AllRides = {} as AllRides;
  baseComponent : BasePageComponent = new BasePageComponent();
  constructor(private service : HistoryService) {}
  
  ngOnInit(): void {
    this.service.getHistory().subscribe((res) => {
      this.all = res;
      console.log("Printing history...");
      console.log(res);
    });
  }

  openDetails(id : Number) {
    this.service.chosenRide = id;
    this.baseComponent.display("details");
  }
}

export interface AllRides {
  totalCount : Number;
  results : Ride[];
}

export interface Ride {
  id: Number;
  startTime: String; 
  endTime: String;
  totalCost: Number;
  driver: User;
  passengers: User[];
  estimatedTimeInMinutes : Number;
  vehicleType: String;
  babyTransport: String;
  petTransport: String;
  rejection : Rejection;
  locations: Route[];
}

export interface User {
  id: Number;
  email: String;
}

export interface Rejection {
  reason: String;
  timeOfRejection: String;
}

export interface Location {
  address: String;
  longitude: Number;
  latitude: Number;
}

// this is not that route...
export interface Route {
    departure: Location;
    destination: Location;
}
