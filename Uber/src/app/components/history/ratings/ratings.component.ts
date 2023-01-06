import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoryService } from 'src/app/service/history.service';
import { AllRides } from '../ride-history/ride-history.component';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  history : AllRides = {} as AllRides;
  ratings : RideReview[] = [];
  constructor(private service: HistoryService) {}

  ngOnInit(): void {
      this.service.getHistory().subscribe((res) =>{
        this.history = res;
      });

      this.service.currentMessage.subscribe(message => {
        this.service.selectedRide = message;
        if (this.service.selectedRide != -1)
        this.service.getReviews(this.history).subscribe((res) =>{
          this.ratings = res;
        });
      });
  }

  showIcon(index: number, rating: Number) {
    if (rating >= index + 1) {
      return "star";
    } else {
      return "unfilled_star";
    }
  }
}

export interface RideReview {
  vehicleReview : Review;
  driverReview : Review;
}

export interface Review {
  id : Number;
  rating : Number;
  comment : String;
  passenger : User;
}

export interface User {
  id : Number;
  email : String;
}
