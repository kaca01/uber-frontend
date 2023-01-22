import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/list-of-users/user.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'ru-navbar',
  templateUrl: './ru-navbar.component.html',
  styleUrls: ['./ru-navbar.component.css'],
})
export class RUNavbarComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService) {}

  isShowDivIf = true;
  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }
  
  ngOnInit(): void {}

  hasSignedIn() {
    return !!this.userService.currentUser;
  }

  userName() {
    if(this.userService.currentUser != null){
      const user = this.userService.currentUser;
      return user.name + ' ' + user.surname;
      }
      return "";
  }

  logOut() {
    this.authService.logout();
  }
}
