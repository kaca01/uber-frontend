import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Driver } from '../components/drivers/drivers.component';

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

  getAll(): Observable<Driver[]> {
    return this.http.get<Driver[]>(environment.apiHost + 'api/driver');
  }
}