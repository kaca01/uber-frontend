import { Component, Input, AfterViewInit, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from 'src/app/service/map.service';
import { LocationDialog } from '../components/home/location-dialog/location_dialog';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  @Input() pickup = '';
  @Input() destination = '';
  @Output() pickup_out = new EventEmitter<string>();
  @Output() destination_out = new EventEmitter<string>();
  markerPickup : any;
  markerDestination : any;
  json_result : any;

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
     this.registerOnClick();
  }

  constructor(
    private mapService: MapService,
    private dialog: MatDialog) {
     }

    openDialog(): void {
      let dialogRef = this.dialog.open(LocationDialog);
    
      dialogRef.afterClosed().subscribe(result => {
        if (result == 1){
          this.pickup = this.json_result.display_name;
          this.setPickup();
          this.pickup = this.getAddress();
          this.pickup_out.emit(this.pickup);
        }
        else if (result == 2) {
          this.destination = this.json_result.display_name;
          this.setDestination();
          this.destination = this.getAddress();
          this.destination_out.emit(this.destination);
        }
      });
    }

  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      const mp = new L.Marker([lat, lng])
      this.mapService.reverseSearch(lat, lng).subscribe((res) => {
        this.json_result = res;
      });
      this.openDialog()
    });
  }

  getAddress(): string{
    if (this.json_result.address.city_district == undefined || this.json_result.address.quarter == undefined || this.json_result.address.road == undefined)
      return this.json_result.display_name;
    if (this.json_result.address.house_number != undefined)
      return this.json_result.address.road + " " + this.json_result.address.house_number +  ", " + this.json_result.address.quarter + ", "+ 
      this.json_result.address.city_district;
    else
      return this.json_result.address.road +  ", " + this.json_result.address.quarter + ", "+ 
      this.json_result.address.city_district;
  }

  setPickup(): void {
    this.mapService.search(this.pickup).subscribe({
      next: (result) => {
        if (this.markerPickup && this.map.hasLayer(this.markerPickup))
            this.map.removeLayer(this.markerPickup);
        this.markerPickup = L.marker([result[0].lat, result[0].lon])
        .addTo(this.map)
        .bindPopup(this.pickup)
        .openPopup();
      },
      error: () => {},
    });
  }

  setDestination(): void {
    this.mapService.search(this.destination).subscribe({
      next: (result) => {
        if (this.markerDestination && this.map.hasLayer(this.markerDestination))
            this.map.removeLayer(this.markerDestination);
        this.markerDestination = L.marker([result[0].lat, result[0].lon])
        .addTo(this.map)
        .bindPopup(this.destination)
        .openPopup();
      },
      error: () => {},
    });
  }

  ngAfterViewInit(): void { 
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });
    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
  }

  ngOnChanges() { 
    this.setPickup();
    this.setDestination();
  }
}