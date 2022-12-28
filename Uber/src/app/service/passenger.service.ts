import { Injectable } from '@angular/core';
import { Passenger } from '../components/passengers/passengers.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PassengerService {
  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();
  
  private passengerList: Passenger[] = [];

  constructor(private http: HttpClient) {
  }

  setValue(test: any) {
    this.value$.next(test);
  }

  getAll(): Passenger[] {
    return this.passengerList;
  }

  add(passenger: any): Observable<any> {
    console.log("Pass" + passenger);
    const options: any = {
      responseType: 'text',
    };
    return this.http.post<string>(environment.apiHost + 'api/passenger', passenger, options);
  }
}