import { Injectable } from '@angular/core';
import { All, Passenger } from '../components/passengers/passengers.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PassengerService {
  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();
  
  constructor(private http: HttpClient) {
  }

  setValue(test: any) {
    this.value$.next(test);
  }

  getAll(): Observable<All> {
    return this.http.get<All>(environment.apiHost + 'api/passenger');
  }

  add(passenger: any): Observable<any> {
    const options: any = {
      responseType: 'text',
    };
    return this.http.post<string>(environment.apiHost + 'api/passenger', passenger, options);
  }

  block(passengerId : Number) : Observable<void> {
    return this.http.put<any>(environment.apiHost + "api/user/" + passengerId.toString() + "/block", {});
  }

  unblock(passengerId : Number) : Observable<void> {
    return this.http.put<any>(environment.apiHost + "api/user/" + passengerId.toString() + "/unblock", {});
  }
}