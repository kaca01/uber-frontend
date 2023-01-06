import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { HistoryService } from 'src/app/service/history.service';
import { AllRides, Ride } from '../ride-history/ride-history.component';

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.css']
})
export class RideDetailsComponent implements OnInit{
  all : AllRides = {} as AllRides;
  ride : Ride = {} as Ride;
  chosenRide : number = -1;
  constructor(private service : HistoryService) {}

  ngOnInit(): void {
    this.service.getHistory().subscribe((res) => {
      this.all = res;
    });
    this.service.currentMessage.subscribe(message => {
      this.chosenRide = message;
      if (this.all.results != undefined) this.ride = this.all.results[this.chosenRide];
    });

  }

  openRatings(id : Number) {
    // TODO : implement this after ratings is added in database
    // TODO : bind this in html
  }
}
