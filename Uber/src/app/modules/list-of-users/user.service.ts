import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AllUsers, AllNotes, User, Note, RequestNote, Vehicle, Driver } from 'src/app/domains';

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
    return this.http.get<AllNotes>(environment.apiHost + "api/user/" + driverId + "/note?page=1&size=2");
  }

  addPassenger(passenger: any): Observable<any> {
    const options: any = {
      responseType: 'text',
    };
    return this.http.post<string>(environment.apiHost + 'api/passenger', passenger, options);
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