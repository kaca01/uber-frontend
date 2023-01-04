import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';

interface DisplayMessage {
  msgType: string;
  msgBody: string;
}

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


  constructor(private router : Router, 
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService) {}

  ngOnInit(): void {
    // this.route.params
    // .pipe(takeUntil(this.ngUnsubscribe))
    // .subscribe((params: any) => {
    //   // this.notification = params as DisplayMessage;
    // });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(): void { 
    this.notification;
    this.submitted = true;

    // if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
      .subscribe(data => {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));
        this.authService.setUser();
        //   this.userService.getMyInfo().subscribe((res: any) => {
        //   console.log(res);
        // });
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
          this.submitted = false;
          this.notification = {msgType: 'error', msgBody: 'Incorrect username or password.'};
        });
    // }
  }
  
}
