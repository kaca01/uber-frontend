import { Component, Input, SimpleChanges, AfterViewInit, AfterViewChecked } from '@angular/core';
import * as L from 'leaflet';
// import 'leaflet-routing-machine';
import { MapService } from 'src/app/service/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  @Input() pickup = '';
  @Input() destination = '';

  // declare L: any;
  private map : any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 45.23707, 19.83538 ],
      zoom: 15
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor(private mapService: MapService) { }

  setPickup(): void {
    this.mapService.search(this.pickup).subscribe({
      next: (result) => {
        console.log(result);
        L.marker([result[0].lat, result[0].lon])
          .addTo(this.map)
          .bindPopup('Pozdrav!')
          .openPopup();
      },
      error: () => {},
    });
  }

  setDestination(): void {
    this.mapService.search(this.destination).subscribe({
      next: (result) => {
        console.log(result);
        L.marker([result[0].lat, result[0].lon])
          .addTo(this.map)
          .bindPopup('pozz!')
          .openPopup();
      },
      error: () => {},
    });
  }

  ngAfterViewInit(): void { 
    let DefaultIcon = L.icon({
      // slika pina
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });
    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    console.log(this.pickup);
    console.log(this.destination);
    this.setPickup();
    this.setDestination();
    // this.route();
  }

  // route(): void {
  //   this.mapService.search(this.destination).subscribe({
  //     next: (result) => {
  //       L.Routing.control({
  //         waypoints: [L.latLng(result[0].lat, result[0].lon), L.latLng(result[1].lat, result[1].lon)],
  //       }).addTo(this.map);
  //     },
  //     error: () => {},
  //   });
  // }

  // ovo sam morala da zakomentarisem inace izmazi gomilu gresaka u inspect-u

  // ngAfterViewChecked(): void {
  //   this.initMap();
  // }
}