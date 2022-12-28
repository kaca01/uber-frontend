import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { All, AllNotes, Driver, Note, RequestNote } from '../components/drivers/drivers.component';

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

  getAll(): Observable<All> {
    return this.http.get<All>(environment.apiHost + 'api/driver');
  }

  block(driverId : Number) : Observable<void> {
    return this.http.put<any>(environment.apiHost + "api/user/" + driverId.toString() + "/block", {});
  }

  unblock(driverId : Number) : Observable<void> {
    return this.http.put<any>(environment.apiHost + "api/user/" + driverId.toString() + "/unblock", {});
  }

  addNote(driverId: Number, note: RequestNote) : Observable<any> {
    const options: any = {
      responseType: 'text',
    };
    return this.http.post<string>(environment.apiHost + "api/user/" + driverId.toString() + "/note", note, options);
  }

  getNotes(driverId: Number) : Observable<AllNotes> {
    return this.http.get<AllNotes>(environment.apiHost + "api/user/" + driverId + "/note?page=1&size=2");
  }
}