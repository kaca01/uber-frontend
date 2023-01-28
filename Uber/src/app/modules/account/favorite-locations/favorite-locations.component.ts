import { A } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { AllFavoriteRides, FavoriteRide } from 'src/app/domains';
import { UserService } from '../../list-of-users/user.service';

@Component({
  selector: 'favorite-locations',
  templateUrl: './favorite-locations.component.html',
  styleUrls: ['./favorite-locations.component.css']
})
export class FavoriteLocationsComponent implements OnInit {

  favoriteNames: string[] = [];
  all = {} as AllFavoriteRides;
  selectedRide = {} as FavoriteRide;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getNames();
  }

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

  naklik(lokacija: string): void {
    this.all['results'].forEach(ride => {
      if(lokacija === ride['favoriteName'])
        this.selectedRide = ride;
    });
    this.userService.removeFavorite(this.selectedRide.id).subscribe();
    this.getNames();
  }
}
