import { A } from '@angular/cdk/keycodes';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AllFavoriteRides, FavoriteRide } from 'src/app/domains';
import { UserService } from '../../list-of-users/user.service';
import { FavoriteDialogComponent } from '../dialogs/favorite-dialog/favorite-dialog.component';
import { OrderFavoriteComponent } from '../dialogs/order-favorite/order-favorite.component';

@Component({
  selector: 'favorite-locations',
  templateUrl: './favorite-locations.component.html',
  styleUrls: ['./favorite-locations.component.css']
})
export class FavoriteLocationsComponent implements AfterContentInit {

  favoriteNames: string[] = [];
  all = {} as AllFavoriteRides;
  selectedRide = {} as FavoriteRide;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngAfterContentInit(): void {
    this.getNames();
  }

  // ngOnInit(): void {
  //   this.getNames();
  // }

  getNames(): void {
    this.favoriteNames = [];
    this.userService.getFavorite().subscribe((res) => {
      this.all = res;
      this.all['results'].forEach(element => {
        this.favoriteNames.push(element['favoriteName']);
      });
      console.log(this.favoriteNames);
    })
  }

  selectRide(name: string) {
    this.all['results'].forEach((ride, i) => {
      if(name === ride['favoriteName'])
        this.selectedRide = ride;
    });
  }

  showDetails(name: string): void {
    this.selectRide(name);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.selectedRide;

    const dialogRef = this.dialog.open(FavoriteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
        this.getNames();
    });
  }

  orderRide() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.selectedRide;

    const dialogRef = this.dialog.open(OrderFavoriteComponent, dialogConfig);
  }
}
