import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, zipAll } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AllRides, RideReview } from '../../domains';
import { UserService } from '../list-of-users/user.service';
import { OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  // TODO : after implementation of login, change the next line
  public selectedRide : number = -1;

  private messageSource = new BehaviorSubject<number>(this.selectedRide);
  currentMessage = this.messageSource.asObservable();

  constructor(private http : HttpClient) { 
  }

  getPassengerHistory(userId : number) : Observable<AllRides> {
    console.log("USERRRR " + userId);
    return this.http.get<AllRides>(environment.apiHost + "api/passenger/" + userId.toString() + "/ride?page=1&size=10&sort='DATE'&from='bla'&to='bla'");
  }

  getReviews(all : AllRides) : Observable<RideReview[]> {
    return this.http.get<RideReview[]>(environment.apiHost + "api/review/" + all.results[this.selectedRide].id);
  }

  sendMessage(message: number) {
    this.messageSource.next(message);
  }
  
}
