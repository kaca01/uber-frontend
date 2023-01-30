import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Driver } from 'src/app/domains';
import { UserService } from '../../list-of-users/user.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });


  hide: boolean = true;
  returnUrl!: string;
  submitted = false;
  notification!: DisplayMessage;
  // private currentUser = {} as User;


  constructor(private router : Router, 
    private authService: AuthService,
    private userService: UserService) {}

  ngOnInit(): void { }

  login(): void { 
    this.notification;
    this.submitted = true;

    this.authService.login(this.loginForm.value)
    .subscribe(data => {
        this.userService.getMyInfo().subscribe((res: any) => {
          if(this.userService.currentUser != null) {
          if(this.userService.currentUser.roles.find(x => x.authority === "ROLE_ADMIN"))
            this.router.navigate(['admin-home']);
          else {
            this.router.navigate(['home-page']);
          }
          }
          });
        },
    error => {
      console.log(error);
      this.submitted = false;
      this.notification = {msgType: 'error', msgBody: 'Incorrect username or password'};
    });
  } 
}

interface DisplayMessage {
  msgType: string;
  msgBody: string;
}
