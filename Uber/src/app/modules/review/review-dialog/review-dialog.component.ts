import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AllRides, ReviewRequest } from 'src/app/domains';
import { HistoryService } from '../../history/history.service';
import { UserService } from '../../list-of-users/user.service';
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from '@angular/material/snack-bar';
import { RatingsComponent } from '../../history/ratings/ratings.component';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ReviewDialogComponent implements OnInit {

  @Input('starCount') public starCount: number = 5;
  @Input('color') public color: string = 'accent';
  @Output() private ratingUpdated = new EventEmitter();

  private ratings : RatingsComponent = {} as RatingsComponent;

  public ratingArr = [] as number[];
  public ratingArr2 = [] as number[];
  public reviewDriver : ReviewRequest = {} as ReviewRequest;
  public reviewVehicle : ReviewRequest = {} as ReviewRequest;
  all : AllRides = {} as AllRides;

  // TODO : add service here
  constructor(private service : HistoryService, private userService: UserService, private _snackBar : MatSnackBar,
              private dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
      this.ratings = data;
      // TODO : set data here
    }

  ngOnInit() {
    this.reviewDriver.rating = 0;
    this.reviewVehicle.rating = 0;
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }

    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr2.push(index);
    }

    if (this.userService.currentUser != undefined) {
      let chosenRide = this.service.selectedRide;
      this.service.currentMessage.subscribe(message => chosenRide = message);
      this.service.getPassengerHistory(this.userService.currentUser.id).subscribe((res) => {
        this.all = res;
      });
    }

  }

  onClick(rating:number) {
    this.reviewDriver.rating = rating;
    this.ratingUpdated.emit(rating); 
    return true;
  }

  showIcon(index:number) {
    if (this.reviewDriver.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  onClick2(rating:number) {
    this.reviewVehicle.rating = rating;
    this.ratingUpdated.emit(rating); 
    return true;
  }

  showIcon2(index:number) {
    if (this.reviewVehicle.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  save() : void {
    if (this.reviewDriver.rating == 0) {
      this.openSnackBar("Enter both reviews!");
      return;
    }

    if (this.reviewVehicle.rating == 0) {
      this.openSnackBar("Enter both reviews!")
      return;
    }

    if (this.userService.currentUser != null) {
      this.service.leaveReviewForDriver(this.reviewDriver, this.all).subscribe(
        (res: any) => {
      },
        (error: HttpErrorResponse) => {
          // Handle error
          // Use if conditions to check error code, this depends on your api, how it sends error messages
      });

      this.service.leaveReviewForDriver(this.reviewVehicle, this.all).subscribe(
        (res: any) => {
        this.openSnackBar("Successfully added!");
        this.ratings.refresh();
        this.dialogRef.close();
      },
        (error: HttpErrorResponse) => {
          // Handle error
          // Use if conditions to check error code, this depends on your api, how it sends error messages
      });
    }
  }

  close() : void{
    this.dialogRef.close();
  }

  openSnackBar(snackMsg : string) : void {
    this._snackBar.open(snackMsg, "Dismiss", {
      duration: 2000
    });
  }
}
