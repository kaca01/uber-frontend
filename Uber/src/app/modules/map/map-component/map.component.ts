import { Component, Input, AfterViewInit, AfterViewChecked, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import * as L from 'leaflet';
import { LayerGroup } from 'leaflet';
import 'leaflet-routing-machine';
import { Driver, Ride, Vehicle, Location, User } from 'src/app/domains';
import { LocationDialog } from '../../home/dialogs/location-dialog/location_dialog';
import { MapService } from '../map.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { UserService } from '../../list-of-users/user.service';
// import { NotificationService } from '../../notification/service/notification.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() pickup = '';
  @Input() destination = '';
  @Output() pickup_out = new EventEmitter<string>();
  @Output() destination_out = new EventEmitter<string>();
  markerPickup : any;
  markerDestination : any;
  json_result : any;

  public map : any;
  private currentRoute: any;

  vehicles: any = {};
  mainGroup: LayerGroup[] = [];
  private stompClient: any;

  public pickup_coord : any;
  public destination_coord : any;

  ngOnInit() {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });
    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
    this.initializeWebSocketConnection();
    this.initMapSimulation();

    // this.notificationService.initializeWebSocketConnection();
}

  private initMap(): void {

    this.map = L.map('map', {
      center: [ 45.253434, 19.831323 ],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    this.registerOnClick();
    console.log("map created");
  }

    initMapSimulation(){
    this.mapService.getAllActiveDrivers().subscribe((res: any) => {
      for (let i=0; i<res.results.length; i++){
        let d = res.results[i] as Driver;
        if(!d.active) continue;
        this.setMarkerActivity(d);
      }
  });
}

  constructor(
    private mapService: MapService,
    // public notificationService: NotificationService,
    private dialog: MatDialog,
    private userService: UserService, 
    private http: HttpClient,
    private router: Router) {}

  openDialog(coord : any): void {
    let dialogRef = this.dialog.open(LocationDialog);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1){
        this.pickup = this.json_result.display_name;
        this.setPickup();
        this.pickup_coord = coord;
        this.json_result = null;
        //this.pickup = this.getAddress();
        this.pickup_out.emit(this.pickup);
      }
      else if (result == 2) {
        this.destination = this.json_result.display_name;
        this.setDestination();
        this.destination_coord = coord;
        this.json_result = null;
        //this.destination = this.getAddress();
        this.destination_out.emit(this.destination);
      }
    });
  }

  initializeWebSocketConnection() {
    let ws = new SockJS('http://localhost:8081/socket');
    console.log("connected socket-map-updates");
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = null;
    let that = this;
    this.stompClient.connect({}, function () {
      that.openGlobalSocket();
    });
  }

  openGlobalSocket() {

    // this.stompClient.subscribe('/socket-publisher/map-updates/update-vehicle-position', (message: { body: string }) => {
    //   let vehicle: Vehicle = JSON.parse(message.body);
    //   let existingVehicle = this.vehicles[vehicle.id.toString()]; 
    //   existingVehicle.setLatLng([vehicle.currentLocation.longitude, vehicle.currentLocation.latitude]);
    //   existingVehicle.update();
    // });

    this.stompClient.subscribe('/socket-publisher/map-updates/driver-login', (message: { body: string }) => {      
      console.log("driver has logged in");
      let driver: Driver = JSON.parse(message.body);
      if(this.vehicles[driver.vehicle.id.toString()] != null) return;
      this.setMarkerActivity(driver);
    });
    
    this.stompClient.subscribe('/socket-publisher/map-updates/start-ride', (message: { body: string }) => {
      let ride: Ride = JSON.parse(message.body);
      this.mapService.getRealDriver(ride.driver.id).subscribe((driver: Driver) => {
        this.map.removeLayer(this.vehicles[driver.vehicle.id.toString()]);
        delete this.vehicles[driver.vehicle.id.toString()]; //brisanje stare ikone
        //da se promijeni iz zelene u crvenu (teleport na departure)
        let location = {} as Location;
        location.latitude = ride.locations[0].departure.latitude;
        location.longitude =  ride.locations[0].departure.longitude;
        driver.vehicle.currentLocation = location;
        let markerLayer = L.marker([driver.vehicle.currentLocation.longitude.valueOf(), driver.vehicle.currentLocation.latitude.valueOf()], {
          icon: L.icon({
            iconUrl: 'assets/images/red-car.png',
            iconSize: [35, 45],
            iconAnchor: [18, 45],
          }),
        });
        markerLayer.addTo(this.map).bindPopup(driver.vehicle.licenseNumber.toString());
        this.vehicles[driver.vehicle.id.toString()] = markerLayer;
        
        this.initCarMovement(driver, ride); 
      });
    });

    this.stompClient.subscribe('/socket-publisher/map-updates/ended-ride', (message: { body: string }) => {
      let ride: Ride = JSON.parse(message.body);
      this.mapService.getRealDriver(ride.driver.id).subscribe((driver: Driver) => {
        this.map.removeLayer(this.vehicles[driver.vehicle.id.toString()]);
        delete this.vehicles[driver.vehicle.id.toString()]; //brisanje stare ikone
        let markerLayer = L.marker([driver.vehicle.currentLocation.longitude.valueOf(), driver.vehicle.currentLocation.latitude.valueOf()], {
          icon: L.icon({
            iconUrl: 'assets/images/green-car.png',
            iconSize: [35, 45],
            iconAnchor: [18, 45],
          }),
        });
        markerLayer.addTo(this.map).bindPopup(driver.vehicle.licenseNumber.toString());
        this.vehicles[driver.vehicle.id.toString()] = markerLayer;
      });
      this.removeRoute(ride);
    });

    this.stompClient.subscribe('/socket-publisher/map-updates/logout', (message: { body: string }) => {
    let driver: Driver = JSON.parse(message.body);
    this.map.removeLayer(this.vehicles[driver.vehicle.id.toString()]);
    delete this.vehicles[driver.vehicle.id.toString()];
    });

    this.stompClient.subscribe('/socket-publisher/map-updates/panic', (message: { body: string }) => {
      let ride: Ride = JSON.parse(message.body);
      this.mapService.getRealDriver(ride.driver.id).subscribe((driver: Driver) => {
        let value = this.checkUserForPanic(driver, ride);
        console.log(value);
        if (value){
          this.map.removeLayer(this.vehicles[driver.vehicle.id.toString()]);
          delete this.vehicles[driver.vehicle.id.toString()];
          this.setPanicMarker(driver, ride, false)
        }
      });

    });
  }

  setMarkerActivity(driver : Driver){
    this.mapService.getDriversActiveRide(driver.id).subscribe((res: Ride) => {
      let value = this.checkUserForPanic(driver, res);
      if (value && res.panic) {
        this.setPanicMarker(driver, res, true)
        return;
      }
      let markerLayer = L.marker([driver.vehicle.currentLocation.longitude.valueOf(), driver.vehicle.currentLocation.latitude.valueOf()], {
        icon: L.icon({
          iconUrl: 'assets/images/red-car.png',
          iconSize: [35, 45],
          iconAnchor: [18, 45],
        }),
      });
      markerLayer.addTo(this.map).bindPopup(driver.vehicle.licenseNumber.toString());
      this.vehicles[driver.vehicle.id.toString()] = markerLayer;
      this.initCarMovement(driver, res);
    }, (error) => {    
      let markerLayer = L.marker([driver.vehicle.currentLocation.longitude.valueOf(), driver.vehicle.currentLocation.latitude.valueOf()], {
        icon: L.icon({
          iconUrl: 'assets/images/green-car.png',
          iconSize: [35, 45],
          iconAnchor: [18, 45],
        }),
      });
      markerLayer.addTo(this.map).bindPopup(driver.vehicle.licenseNumber.toString());
      this.vehicles[driver.vehicle.id.toString()] = markerLayer;
    });
  }

  checkUserForPanic(driver: Driver, ride:Ride): boolean {
    let flag = false;
    if(this.userService.currentUser != undefined && this.userService.currentUser != null){
      if (this.userService.currentUser.roles.find(x => x.authority === "ROLE_ADMIN")){
          flag  = true;
    }else if (driver.id == this.userService.currentUser.id){
        flag = true;
    }
    else {
      ride.passengers.forEach( (p) => {
        if (p.email == this.userService.currentUser!.email){
            flag = true;
          }
        }); 
      }
    }
    return flag;
  }

  setPanicMarker(driver: Driver, ride:Ride, callInit : boolean){
    let markerLayer = L.marker([driver.vehicle.currentLocation.longitude.valueOf(), driver.vehicle.currentLocation.latitude.valueOf()], {
      icon: L.icon({
        iconUrl: 'assets/images/panic.png',
        iconSize: [35, 35],
        iconAnchor: [18, 45],
      }),
    });
    markerLayer.addTo(this.map).bindPopup(driver.vehicle.licenseNumber.toString());
    this.vehicles[driver.vehicle.id.toString()] = markerLayer;
    if(callInit) this.initCarMovement(driver, ride);
  }

  initCarMovement(driver:Driver, ride:Ride){
    let coordinates: any[] = [];
    console.log(driver);
    console.log(ride);
    this.mapService.getRouteSteps(driver, ride).subscribe(async routes => {
      for (let step of routes['routes'][0]['legs'][0]['steps']) {
        for (let c of step['geometry']['coordinates']) {
          coordinates.push(c);
          }
        }
      for (let c of coordinates){
        await new Promise(f => setTimeout(f, 1000));
        if (this.router.url != '/home-page' && this.router.url != "/admin-home")
          return;
        let location = {} as Location;
        location.latitude = c[0];
        location.longitude = c[1];
        this.mapService.updateLocation(driver.vehicle.id.valueOf(), location).subscribe((res: Vehicle) => {

          let existingVehicle = this.vehicles[driver.vehicle.id.toString()]; 
          existingVehicle.setLatLng([res.currentLocation.longitude, res.currentLocation.latitude]);
          existingVehicle.update();
        })
      }
    });
    this.addRoute(ride);
  }

  removeRoute(ride:Ride){
    if (this.userService.currentUser != undefined && this.userService.currentUser != null){
      if (this.userService.currentUser.roles.find(x => x.authority === "ROLE_DRIVER")){
        if (ride.driver.email == this.userService.currentUser.email){
          this.map.removeControl(this.currentRoute);
          this.currentRoute= null;
        }
      }
      else if(this.userService.currentUser.roles.find(x => x.authority === "ROLE_PASSENGER")){
        ride.passengers.forEach( (p) => {
          if (p.email == this.userService.currentUser!.email){
            this.map.removeControl(this.currentRoute);
            this.currentRoute= null;
          }
        }); 
      }
    }
  }

  addRoute(ride:Ride){
    if (this.userService.currentUser != undefined && this.userService.currentUser != null){
      if (this.userService.currentUser.roles.find(x => x.authority === "ROLE_DRIVER")){
        if (ride.driver.id != this.userService.currentUser!.id) return;
        this.currentRoute = L.Routing.control({
          waypoints: [L.latLng(ride.locations[0].departure.longitude, ride.locations[0].departure.latitude),
           L.latLng(ride.locations[0].destination.longitude, ride.locations[0].destination.latitude)],
        });
        this.currentRoute.addTo(this.map);
      }
      else if(this.userService.currentUser.roles.find(x => x.authority === "ROLE_PASSENGER")){
        ride.passengers.forEach( (p) => {
          if (p.email == this.userService.currentUser!.email){
            this.currentRoute = L.Routing.control({
              waypoints: [L.latLng(ride.locations[0].departure.longitude, ride.locations[0].departure.latitude),
               L.latLng(ride.locations[0].destination.longitude, ride.locations[0].destination.latitude)],
            });
            this.currentRoute.addTo(this.map);
          }
        });
      }
    }
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
      this.openDialog(coord);
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

  ngOnChanges() { 
    this.setPickup();
    this.setDestination();
  }

}