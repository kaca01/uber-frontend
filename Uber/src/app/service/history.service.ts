import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AllRides } from '../components/history/ride-history/ride-history.component';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  // TODO : after implementation of login, change the next line
  private currentUserId : Number = 1;

  constructor(private http : HttpClient) { }

  getHistory() : Observable<AllRides> {
    return this.http.get<AllRides>(environment.apiHost + "api/user/" + this.currentUserId.toString() + "/ride?page=1&size=10&sort='DATE'&from='bla'&to='bla'");
  }
}
