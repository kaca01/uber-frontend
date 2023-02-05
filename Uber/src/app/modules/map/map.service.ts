import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Driver, Ride, Vehicle, Location } from 'src/app/domains';
import { environment } from 'src/environments/environment.prod';
import { ApiService } from '../auth/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private reqClient: HttpClient;

  constructor(private http: HttpClient, private handler: HttpBackend) {
      this.reqClient = new HttpClient(handler);
    }

  search(street: string): Observable<any> {
    return this.http.get(
      'https://nominatim.openstreetmap.org/search?format=json&q=' + street
    );
  }

  reverseSearch(lat: number, lon: number): Observable<any> {
    return this.http.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&<params>`
    );
  }

  getRouteSteps(driver:Driver, ride:Ride): Observable<any> {
    return this.reqClient.get<any>('https://routing.openstreetmap.de/routed-car/route/v1/driving/'
    + driver.vehicle.currentLocation.latitude + ',' + driver.vehicle.currentLocation.longitude + ';' + ride.locations[0].destination.latitude + ','
    + ride.locations[0].destination.longitude + '?geometries=geojson&overview=false&alternatives=true&steps=true')
  }

  updateLocation(vehicleId: number, location: Location): Observable<Vehicle> {
    return this.http.put<Vehicle>(environment.apiHost + "api/vehicle/" + vehicleId.toString() +"/location", location);
  }

  setDriverToActive(id: Number): Observable<Driver> {
    return this.http.get<Driver>(environment.apiHost + 'api/driver/' + id + '/active');
  }

  getAllActiveDrivers(): Observable<any> {
    return this.http.get<any>(environment.apiHost + 'api/driver/all/active');
  }

  getRealDriver(driverId: Number): Observable<Driver>  {
    return this.http.get<Driver>(environment.apiHost + "api/driver/" + driverId +"/driver/real");
  }

  getDriversActiveRide(driverId: Number): Observable<Ride>  {
    return this.http.get<Ride>(environment.apiHost + "api/ride/driver/" + driverId +"/active");
  }

  startRide(rideId: number): Observable<Ride> {
    return this.http.put<Ride>(environment.apiHost + "api/ride/" + rideId +"/start", {});
  }

  endRide(rideId: number): Observable<Ride> {
    return this.http.put<Ride>(environment.apiHost + "api/ride/" + rideId +"/end", {});
  }

  getNextRide(driverId: Number): Observable<Driver>  {
    return this.http.get<Driver>(environment.apiHost + "api/ride/nextRide/" + driverId);
  }
}
