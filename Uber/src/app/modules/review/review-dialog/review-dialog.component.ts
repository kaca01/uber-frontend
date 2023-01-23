import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  comment = "";
  comment2 = "";

  // TODO : add service here
  constructor(private dialogRef: MatDialogRef<ReviewDialogComponent>,
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

  }

  close() : void{
    this.dialogRef.close();
  }
}
