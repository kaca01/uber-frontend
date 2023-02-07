import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../../list-of-users/user.service';
import { Driver } from 'src/app/domains';

@Injectable()
export class AuthService {

  constructor (
    private apiService: ApiService,
    private userService: UserService,
    private config: ConfigService,
    private router: Router ) {}

  private access_token = null;

  login(user: any) {
    const loginHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    const body = {
      'email': user.email,
      'password': user.password
    };
    return this.apiService.post(this.config.login_url, JSON.stringify(body), loginHeaders)
      .pipe(map((res) => {
        console.log('Login success');
        this.access_token = res.body.accessToken;
        localStorage.setItem("jwt", res.body.accessToken)
      }));
  }

  logout() {
    if (this.userService.currentUser?.roles[0].name == "ROLE_DRIVER") {
      this.userService.logoutDriver(this.userService.currentUser.id).subscribe((res: Driver) => {
        let driver= res as Driver;
        //console.log(driver);
      });
    }
    this.userService.currentUser = null;
    localStorage.removeItem("jwt");
    this.access_token = null;
    this.router.navigate(['/home-page']).then(() => {
      window.location.reload();
    });
  }

  tokenIsPresent() {
    return this.access_token != undefined && this.access_token != null;
  }

  getToken() {
    return this.access_token;
  }
}
