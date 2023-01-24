import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AllRides, ReviewRequest } from 'src/app/domains';
import { HistoryService } from '../../history/history.service';
import { UserService } from '../../list-of-users/user.service';
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ReviewDialogComponent implements OnInit {

  @Input('rating') public rating: number = 0;
  @Input('rating2') public rating2 : number = 0;
  @Input('starCount') public starCount: number = 5;
  @Input('color') public color: string = 'accent';
  @Output() private ratingUpdated = new EventEmitter();

  public ratingArr = [] as number[];
  public ratingArr2 = [] as number[];
  public review : ReviewRequest = {} as ReviewRequest;
  comment = "";
  comment2 = "";
  all : AllRides = {} as AllRides;

  // TODO : add service here
  constructor(private service : HistoryService, private userService: UserService, private _snackBar : MatSnackBar,
              private dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
      // TODO : set data here
    }

  ngOnInit() {
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
    this.rating = rating;
    this.ratingUpdated.emit(rating); 
    return true;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  onClick2(rating:number) {
    this.rating2 = rating;
    this.ratingUpdated.emit(rating); 
    return true;
  }

  showIcon2(index:number) {
    if (this.rating2 >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  save() : void {
    this.review.comment = this.comment;
    this.review.rating = this.rating;
    if (this.userService.currentUser != null)
    this.service.leaveReviewForDriver(this.review, this.all).subscribe(
      (res: any) => {
      this.openSnackBar("Successfully added!");
      this.dialogRef.close();
    },
      (error: HttpErrorResponse) => {
        // Handle error
        // Use if conditions to check error code, this depends on your api, how it sends error messages
    }
  );
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
