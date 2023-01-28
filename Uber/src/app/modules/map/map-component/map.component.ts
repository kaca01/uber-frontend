import { Component, Input, AfterViewInit, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import * as L from 'leaflet';
import { LayerGroup } from 'leaflet';
import 'leaflet-routing-machine';
import { Driver, Ride, Vehicle } from 'src/app/domains';
import { LocationDialog } from '../../home/location-dialog/location_dialog';
import { MapService } from '../map.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { UserService } from '../../list-of-users/user.service';

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
  private routingControl: any;

  vehicles: any = {};
  mainGroup: LayerGroup[] = [];
  private stompClient: any;

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
    private dialog: MatDialog,
    private userService: UserService) {}

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

    
  ngOnInit(): void {
    this.initializeWebSocketConnection();
    //dopisati funkciju koja dobavlja iz baze i setuje sve inicijalno 
  }

  initializeWebSocketConnection() {
    let ws = new SockJS('http://localhost:8081/socket');
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = null;
    let that = this;
    this.stompClient.connect({}, function () {
      that.openGlobalSocket();
    });
  }

  openGlobalSocket() {

    this.stompClient.subscribe('/map-updates/update-vehicle-position', (message: { body: string }) => {
      let vehicle: Vehicle = JSON.parse(message.body);
      let existingVehicle = this.vehicles[vehicle.id.toString()];
      existingVehicle.setLatLng([vehicle.currentLocation.longitude, vehicle.currentLocation.latitude]);
      existingVehicle.update();
      //negdje drugo ce trebati update-ovati poziciju na beku (trenutno se iz pajtona salje beku, pa sa beka frontu)
    });

    this.stompClient.subscribe('/map-updates/driver-login', (message: { body: string }) => {
      let driver: Driver = JSON.parse(message.body);
      let geoLayerRouteGroup: LayerGroup = new LayerGroup();
      let color = Math.floor(Math.random() * 16777215).toString(16);
      // nema jos kretanja za ulogovanog vozaca
      // for (let step of JSON.parse(ride.routeJSON)['routes'][0]['legs'][0]['steps']) {
      //   let routeLayer = geoJSON(step.geometry);
      //   routeLayer.setStyle({ color: `#${color}` });
      //   //routeLayer.addTo(geoLayerRouteGroup);
      //   this.rides[ride.id] = geoLayerRouteGroup;
      // }
      let markerLayer = L.marker([driver.vehicle.currentLocation.longitude.valueOf(), driver.vehicle.currentLocation.latitude.valueOf()], {
        icon: L.icon({
          iconUrl: 'assets/car.png', //todo ikonu postaviti zavisno od toga da li ima aktivnu voznju (ili odmah na zeleno?)
          iconSize: [35, 45],
          iconAnchor: [18, 45],
        }),
      });
      markerLayer.addTo(geoLayerRouteGroup);
      this.vehicles[driver.vehicle.id.toString()] = markerLayer;
      this.mainGroup = [...this.mainGroup, geoLayerRouteGroup];
    });
    
    this.stompClient.subscribe('/map-updates/start-ride', (message: { body: string }) => {
      let ride: Ride = JSON.parse(message.body);
      let driver! : Driver;
      this.userService.getDriver(ride.driver.id).subscribe((res: any) => {
        driver= res;
      });
      this.mainGroup = this.mainGroup.filter((lg: LayerGroup) => lg !== this.vehicles[driver.vehicle.id.toString()]);
      delete this.vehicles[driver.vehicle.id.toString()]; //brisanje stare ikone

      let geoLayerRouteGroup: LayerGroup = new LayerGroup();
      let color = Math.floor(Math.random() * 16777215).toString(16);
      //todo ovaj dio otkomentarisati kad dodam routeJson atribut na beku i svugdje (ne mora na beku ako cu api slati sa fronta?)
      // for (let step of JSON.parse(ride.routeJSON)['routes'][0]['legs'][0]['steps']) {
      //   let routeLayer = geoJSON(step.geometry);
      //   routeLayer.setStyle({ color: `#${color}` });
      //   //routeLayer.addTo(geoLayerRouteGroup);
      //   this.rides[ride.id] = geoLayerRouteGroup;
      // }
      let markerLayer = L.marker([driver.vehicle.currentLocation.longitude.valueOf(), driver.vehicle.currentLocation.latitude.valueOf()], {
        icon: L.icon({
          iconUrl: 'assets/car.png', //todo ikonu postaviti na crveno
          iconSize: [35, 45],
          iconAnchor: [18, 45],
        }),
      });
      markerLayer.addTo(geoLayerRouteGroup);
      this.vehicles[driver.vehicle.id.toString()] = markerLayer;
      this.mainGroup = [...this.mainGroup, geoLayerRouteGroup];
    });

    this.stompClient.subscribe('/map-updates/ended-ride', (message: { body: string }) => {
      let ride: Ride = JSON.parse(message.body);
      let driver! : Driver;
      this.userService.getDriver(ride.driver.id).subscribe((res: any) => {
        driver= res;
      });
      this.mainGroup = this.mainGroup.filter((lg: LayerGroup) => lg !== this.vehicles[driver.vehicle.id.toString()]);
      delete this.vehicles[driver.vehicle.id.toString()]; //brisanje stare ikone

      let geoLayerRouteGroup: LayerGroup = new LayerGroup();
      let markerLayer = L.marker([driver.vehicle.currentLocation.longitude.valueOf(), driver.vehicle.currentLocation.latitude.valueOf()], {
        icon: L.icon({
          iconUrl: 'assets/car.png', //todo ikonu postaviti na zeleno
          iconSize: [35, 45],
          iconAnchor: [18, 45],
        }),
      });
      markerLayer.addTo(geoLayerRouteGroup);
      this.vehicles[driver.vehicle.id.toString()] = markerLayer;
      this.mainGroup = [...this.mainGroup, geoLayerRouteGroup];
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