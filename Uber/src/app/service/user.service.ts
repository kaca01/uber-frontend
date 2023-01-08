import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {ApiService} from './api.service';
import {ConfigService} from './config.service';
import {map} from 'rxjs/operators';
import { All } from '../components/drivers/drivers.component';


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

interface User {
  active: Boolean,
  address: String,
  blocked: Boolean,
  email: String,
  enabled: Boolean,
  id: Number,
  lastPasswordResetDate: Number,
  name: String,
  profilePicture: String,
  roles: Role[],
  surname: String,
  telephoneNumber: String,
  username: String
}

interface Role {
  id: Number,
  name: String,
  authority: String
}

export interface AllNotes {
  totalCount: number;
  results: Note[];
}

export interface RequestNote {
  message: string;
}

export interface Note {
  id: number;
  date: string;
  message: string;
}