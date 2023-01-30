import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AllUsers, AllNotes, User, Note, RequestNote, UpdateUser, ResetPassword, ChangePassword, Vehicle, Driver } from 'src/app/domains';

import {map} from 'rxjs/operators'
import { ApiService } from '../auth/services/api.service';
import { ConfigService } from '../auth/services/config.service';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();

  public currentUser = {} as User | null;

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
  setValue(test: any) {
    this.value$.next(test);
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

  getNotes(driverId: Number) : Observable<AllNotes> {
    return this.http.get<AllNotes>(environment.apiHost + "api/user/" + driverId + "/note");
  }

  addPassenger(passenger: any): Observable<any> {
    const options: any = {
      responseType: 'text',
    };
    return this.http.post<string>(environment.apiHost + 'api/passenger', passenger, options);
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

  addDriver(user : Driver): Observable<any> {
    const options: any = {
      responseType: 'text',
    };
    return this.http.post<string>(environment.apiHost + 'api/driver', user, options);
  }

  deleteDriver(driverId : Number): Observable<any> {
    const options: any = {
      responseType: 'text',
    };
    return this.http.delete<string>(environment.apiHost + 'api/driver/' + driverId, options);
  }

  addVehicle(vehicle : any, driverId : Number): Observable<any> {
    const options: any = {
      responseType: 'text',
    };
    return this.http.post<string>(environment.apiHost + "api/driver/" + driverId + "/vehicle", vehicle, options);
  }
}