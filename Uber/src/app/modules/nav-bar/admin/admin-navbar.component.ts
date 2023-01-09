import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css'],
})
export class AdminNavbarComponent implements OnInit {

  constructor(private userService: UserService) {}

  ngOnInit() {
  }

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
}
