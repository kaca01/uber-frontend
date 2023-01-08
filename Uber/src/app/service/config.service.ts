import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _api_url = 'http://localhost:8081/api';

  private _login_url = this._api_url + '/user/login';

  get login_url(): string {
    return this._login_url;
  }

  private _current_user_url = this._api_url + '/currentUser';

  get current_user_url(): string {
    return this._current_user_url;
  }
}
