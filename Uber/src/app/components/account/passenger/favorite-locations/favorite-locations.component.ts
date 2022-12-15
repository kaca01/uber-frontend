import { Component } from '@angular/core';

@Component({
  selector: 'favorite-locations',
  templateUrl: './favorite-locations.component.html',
  styleUrls: ['./favorite-locations.component.css']
})
export class FavoriteLocationsComponent {
  favoriteLocations: string[] = ['Bulevar Oslobođenja 51a', 
  'Jovana Cvijića 12', 'Bulevar Evrope 123', 'Njegoševa 84', 'Laze Kostića 41',
  'Bulevar Oslobođenja 51a', 
  'Jovana Cvijića 12', 'Bulevar Evrope 123', 'Njegoševa 84', 'Laze Kostića 41'];
}
