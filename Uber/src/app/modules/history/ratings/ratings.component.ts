import { Component, OnInit } from '@angular/core';
import { AllRides, RideReview } from 'src/app/domains';
import { HistoryService } from 'src/app/modules/history/history.service';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  private basePage : BasePageComponent = new BasePageComponent();
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

  backToHistoryDetails() : void {
    this.basePage.display("details");
  }
}
