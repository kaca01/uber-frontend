import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, zipAll } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AllRides, Review, ReviewRequest, Ride, RideReview } from '../../domains';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  public selectedRide : number = -1;

  private messageSource = new BehaviorSubject<number>(this.selectedRide);
  currentMessage = this.messageSource.asObservable();

  constructor(private http : HttpClient) { 
  }

  getPassengerHistory(userId : number) : Observable<AllRides> {
    return this.http.get<AllRides>(environment.apiHost + "api/passenger/" + userId.toString() + "/ride?page=1&size=10&sort='DATE'&from='bla'&to='bla'");
  }

  getDriverHistory(userId : number) : Observable<AllRides> {
    return this.http.get<AllRides>(environment.apiHost + "api/driver/" + userId.toString() + "/ride?page=1&size=10&sort='DATE'&from='bla'&to='bla'");
  }

  getReviews(all : AllRides) : Observable<RideReview[]> {
    return this.http.get<RideReview[]>(environment.apiHost + "api/review/" + all.results[this.selectedRide].id);
  }

  leaveReviewForVehicle(review : ReviewRequest, all : AllRides) : Observable<Review> {
    return this.http.post<Review>(environment.apiHost + "api/review/" + all.results[this.selectedRide].id + "/vehicle", review);
  }

  leaveReviewForDriver(review : ReviewRequest, all : AllRides) : Observable<Review> {
    return this.http.post<Review>(environment.apiHost + "api/review/" + all.results[this.selectedRide].id + "/driver", review);

  }

  sendMessage(message: number) {
    this.messageSource.next(message);
  }

  getSelectedRide(all : AllRides) : Ride {
    return all.results[this.selectedRide];  
  }
  
}
