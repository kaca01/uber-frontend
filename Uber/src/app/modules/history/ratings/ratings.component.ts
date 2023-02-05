import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AllRides, RideReview, User } from 'src/app/domains';
import { HistoryService } from 'src/app/modules/history/history.service';
import { UserService } from '../../list-of-users/user.service';
import { ReviewDialogComponent } from '../../review/review-dialog/review-dialog.component';
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
  constructor(private service: HistoryService, private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.userService.currentUser != undefined)
      if (this.userService.currentUser.roles[0].name === "ROLE_PASSENGER") {
        this.service.getPassengerHistory(this.userService.currentUser.id).subscribe((res) =>{
          this.history = res;
        });
      } else {
        this.service.getDriverHistory(this.userService.currentUser.id).subscribe((res) =>{
          this.history = res;
        });
      }

      this.service.currentMessage.subscribe(message => {
        this.service.selectedRide = message;
          if (this.service.selectedRide != -1) {
            console.log(this.service.selectedRide);
            this.service.getReviews(this.history).subscribe((res) =>{
              this.ratings = res;
              this.setDisplayReviewButton();
            });
        }
      });
  }

  public refresh() : void {
    if (this.service.selectedRide != -1) {
      console.log(this.service.selectedRide);
        this.service.getReviews(this.history).subscribe((res) =>{
          this.ratings = res;
          this.setDisplayReviewButton();
        });
      }
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

  openReviewDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this;

    this.dialog.open(ReviewDialogComponent, dialogConfig);
  }

  setDisplayReviewButton() : void {
    const reviewBtn = document.getElementById('rate');

    if (this.userService.currentUser != null) {
      if (this.userService.currentUser.roles[0].name === "ROLE_DRIVER") {
        if (reviewBtn != null) reviewBtn.style.display = 'none';
        return;
      }
    }

    if (this.isReviewed()){
      if (reviewBtn != null) reviewBtn.style.display = 'none';
    }
    else {
      if(!this.isExpired(this.service.getSelectedRide(this.history).endTime)) {
        if (reviewBtn != null) reviewBtn.style.display = 'block';
      } else {
        if (reviewBtn != null) reviewBtn.style.display = 'none';
      }
    }
  }

  isExpired(rideDate : String) : boolean {
    let date : Date | null = this.parseStringToDate(rideDate);
    // here it is not expired, but it is not finished
    // so it means that passenger can not rate this ride
    if (date == null) {
      return true;
    }
    let now : Date = new Date();
    const msInDay = 24 * 60 * 60 * 1000;

    let diff : number =  Math.round(Math.abs(Number(now) - Number(date)) / msInDay);
    if (diff > 3) return true;
    
    return false;
  }

  parseStringToDate(rideDate : String) : Date | null {
    if (rideDate != null) {
      const [dateStr, timeStr] = rideDate.split('T');
      const [year, month, day] = dateStr.split("-");  
      const [hours, minutes, seconds] = timeStr.split(":");
      const secondsStr : string = seconds.split(".")[0];
      let date : Date  = new Date(+year, +month - 1, +day, +hours, +minutes, +secondsStr); 
      return date;
    }
    return null;
  }

  isReviewed() : boolean {
    let isReviewed : boolean = false;
    this.ratings.forEach(element => {
      if ((element.driverReview.passenger.id || element.vehicleReview.passenger.id) == this.userService.currentUser?.id) {
        isReviewed = true;
      }
    });
    return isReviewed;
  }
}
