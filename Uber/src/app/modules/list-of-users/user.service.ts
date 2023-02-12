import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AllUsers, AllNotes, User, Note, RequestNote, UpdateUser, ResetPassword, ChangePassword, Vehicle, Driver, AllFavoriteRides, Ride, Location, Role } from 'src/app/domains';

import { map } from 'rxjs/operators'
import { ApiService } from '../auth/services/api.service';
import { ConfigService } from '../auth/services/config.service';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();

  public currentUser : User | null = null;

  constructor(
    private apiService: ApiService,
    private config: ConfigService,
    private http: HttpClient) { }

  getMyInfo() {
    return this.apiService.get(this.config.current_user_url)
      .pipe(map(user => {
        this.currentUser = user;
        return user;
    }));
  }

  login(user:any) : Observable<any>{
    return this.http.post<any>(environment.apiHost + "api/user/login", user);
  }

  getAllDrivers(): Observable<AllUsers> {
    return this.http.get<AllUsers>(environment.apiHost + 'api/driver');
  }

  getAllPassengers(): Observable<AllUsers> {
    return this.http.get<AllUsers>(environment.apiHost + 'api/passenger');
  }

  block(userId : Number) : Observable<void> {
    return this.http.put<any>(environment.apiHost + "api/user/" + userId.toString() + "/block", {});
  }

  unblock(userId : Number) : Observable<void> {
    return this.http.put<any>(environment.apiHost + "api/user/" + userId.toString() + "/unblock", {});
  }

  addNote(userId: Number, note: RequestNote) : Observable<any> {
    const options: any = {
      responseType: 'text',
    };
    return this.http.post<string>(environment.apiHost + "api/user/" + userId.toString() + "/note", note, options);
  }

  getNotes(driverId: number) : Observable<AllNotes> {
    return this.http.get<AllNotes>(environment.apiHost + "api/user/" + driverId + "/note");
  }

  addPassenger(passenger: any): Observable<User> {
    return this.http.post<User>(environment.apiHost + 'api/passenger', passenger);
  }

  updatePassenger(passengerId: number, passeneger: UpdateUser): Observable<User> {
    return this.http.put<User>(environment.apiHost + "api/passenger/" + passengerId.toString(), passeneger);
  } 

  getChanges(driverId: number): Observable<User>  {
    return this.http.get<User>(environment.apiHost + "api/driver/changes/" + driverId);
  }

  getActivation(activationId: number): Observable<String>  {
    return this.http.get<String>(environment.apiHost + "api/passenger/activate/" + activationId);
  }

  updateDriver(driverId: number, driver: UpdateUser): Observable<User> {
    return this.http.put<User>(environment.apiHost + "api/driver/" + driverId.toString(), driver);
  }

  addChanges(driverId: number, driver: UpdateUser): Observable<User> {
    return this.http.post<User>(environment.apiHost + 'api/driver/changes/' + driverId, driver);
  }

  addImage(userId: number, file: File): Observable<void> {
    let formParams = new FormData();
    formParams.append('file', file)
    return this.http.put<void>(environment.apiHost + 'api/picture/' + userId, formParams);
  }

  getImage(userId: number): Observable<any> {
    return this.http.get<void>(environment.apiHost + 'api/picture/' + userId);
  }

  deleteImage(userId: number): Observable<void> {
    return this.http.delete<void>(environment.apiHost + 'api/picture/' + userId);
  }

  sendEmail(userEmail: string): Observable<void> {
    return this.http.get<void>(environment.apiHost + 'api/user/' + userEmail + "/resetPassword");
  }

  resetPassword(userEmail: string, resetPassword: ResetPassword): Observable<void> {
    return this.http.put<void>(environment.apiHost + 'api/user/' + userEmail + "/resetPassword", resetPassword);
  }

  changePassword(userId: number, changePassword: ChangePassword): Observable<void> {
    return this.http.put<void>(environment.apiHost + 'api/user/' + userId + "/changePassword", changePassword);
  }

  addDriver(user : Driver): Observable<Driver> {
    return this.http.post<Driver>(environment.apiHost + 'api/driver', user);
  }

  getDriver(driverId: Number): Observable<Driver>  {
    return this.http.get<Driver>(environment.apiHost + "api/driver/" + driverId);
  }

  deleteDriver(driverId : Number): Observable<Driver> {
    return this.http.delete<Driver>(environment.apiHost + 'api/driver/' + driverId);
  }

  addVehicle(vehicle : Vehicle, driverId : Number): Observable<Vehicle> {
    return this.http.post<Vehicle>(environment.apiHost + "api/driver/" + driverId + "/vehicle", vehicle);
  }

  getFavorite(): Observable<AllFavoriteRides> {
    return this.http.get<AllFavoriteRides>(environment.apiHost + "api/ride/favorites");
  }

  removeFavorite(rideId: number): Observable<void> {
    return this.http.delete<void>(environment.apiHost + "api/ride/favorites/" + rideId);
  }

  getRole(userId : Number) : Observable<Role> {
    return this.http.get<Role>(environment.apiHost + "api/user/" + userId.toString() + "/role", {});
  }
  
  logoutDriver(id: Number): Observable<Driver> {
    return this.http.get<Driver>(environment.apiHost + 'api/driver/' + id + '/logout');
  
  }

  getDriverActiveRide(driverId: number): Observable<Ride> {
    return this.http.get<Ride>(environment.apiHost + 'api/ride/driver/' + driverId + '/active');
  }

  getPassengerActiveRide(passengerId: number): Observable<Ride> {
    return this.http.get<Ride>(environment.apiHost + 'api/ride/passenger/' + passengerId + '/active');
  }

  getVehicle(driverId: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(environment.apiHost + 'api/driver/' + driverId + '/vehicle');
  }
}