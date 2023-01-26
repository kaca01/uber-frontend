import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RideRequest, Ride, UserEmail } from 'src/app/domains';
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

  checkIfInvitedPassengerExists(email : string) : Observable<UserEmail> {
    return this.http.get<UserEmail>(environment.apiHost + "api/passenger/invitation/" + email);
  }
}
