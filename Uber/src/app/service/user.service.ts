import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {ApiService} from './api.service';
import {ConfigService} from './config.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
