import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-history-page',
  templateUrl: './map-history-page.component.html',
  styleUrls: ['./map-history-page.component.css']
})
export class MapHistoryPageComponent{

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

  constructor() {}

  ngAfterViewInit(): void { 
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });
    L.Marker.prototype.options.icon = DefaultIcon;
  }

  ngAfterViewChecked() : void {
    this.initMap();
  }
}
