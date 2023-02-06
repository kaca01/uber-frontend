import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AllUsers, AllNotes, User, Note, RequestNote, UpdateUser, ResetPassword, ChangePassword, Vehicle, Driver, AllFavoriteRides, Ride, Location, Role, AllReports } from 'src/app/domains';

import { map } from 'rxjs/operators'
import { ApiService } from '../../auth/services/api.service';
import { ConfigService } from '../../auth/services/config.service';



@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();

  public currentUser : User | null= null;

  constructor(
    private apiService: ApiService,
    private config: ConfigService,
    private http: HttpClient) {
     }

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

  getCrossedKmsReport(userId: number): Observable<AllReports> {
    return this.http.get<AllReports>(environment.apiHost + 'api/report/crossed-kms/' + userId);
  }

  getNumOfRidesReport(userId: number): Observable<AllReports> {
    return this.http.get<AllReports>(environment.apiHost + 'api/report/num-of-rides/' + userId);
  }

  getSumOfMoneyReport(userId: number): Observable<AllReports> {
    return this.http.get<AllReports>(environment.apiHost + 'api/report/money-sum/' + userId);
  }
}