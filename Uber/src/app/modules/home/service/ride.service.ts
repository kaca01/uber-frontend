import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RideRequest, Ride, UserEmail, FavoriteRideRequest, FavoriteRide, Panic, PanicRequest } from 'src/app/domains';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  constructor(private http: HttpClient) { }

  createRide(ride : RideRequest) : Observable<Ride> {
    return this.http.post<Ride>(environment.apiHost + "api/ride", ride);
  }

  checkIfInvitedPassengerExists(emails : String[]) : Observable<UserEmail[]> {
    return this.http.put<UserEmail[]>(environment.apiHost + "api/passenger/invitation", emails);
  }

  addFavorite(ride: FavoriteRideRequest) : Observable<FavoriteRide> {
    return this.http.post<FavoriteRide>(environment.apiHost + "api/ride/favorites", ride);
  }

  accept(id: number) : Observable<Ride> {
    return this.http.put<Ride>(environment.apiHost + "api/ride/" + id + "/accept", {});
  }

  panic(rideId: number, panic: PanicRequest): Observable<Ride> {
    return this.http.put<Ride>(environment.apiHost + 'api/ride/' + rideId + '/panic', panic);
  } 

  cancelRide(rideId: number, cancel: PanicRequest): Observable<Ride> {
    return this.http.put<Ride>(environment.apiHost + 'api/ride/' + rideId + '/cancel', cancel);
  } 

  getRide(rideId: number): Observable<Ride> {
    return this.http.get<Ride>(environment.apiHost + 'api/ride/' + rideId);
  } 

  passengerCancelRide(rideId: number, cancel: PanicRequest): Observable<Ride> {
    return this.http.put<Ride>(environment.apiHost + 'api/ride/' + rideId + '/withdraw', cancel);
  } 
}
