import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { All, AllNotes, User, Note, RequestNote } from '../components/drivers/drivers.component';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();

  constructor(private http: HttpClient) {
  }

  setValue(test: any) {
    this.value$.next(test);
  }

  getAllDrivers(): Observable<All> {
    return this.http.get<All>(environment.apiHost + 'api/driver');
  }

  getAllPassengers(): Observable<All> {
    return this.http.get<All>(environment.apiHost + 'api/passenger');
  }

  block(userId : Number) : Observable<void> {
    return this.http.put<any>(environment.apiHost + "api/user/" + userId.toString() + "/block", {});
  }

  unblock(userId : Number) : Observable<void> {
    return this.http.put<any>(environment.apiHost + "api/user/" + userId.toString() + "/unblock", {});
  }

  addNote(userId: Number, note: RequestNote) : Observable<any> {
    console.log("User id");
    console.log(userId);
    console.log("req note");
    console.log(note);
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
}