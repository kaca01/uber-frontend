import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router : Router) {}

  ngOnInit(): void {}

  onLogin() {
    if (this.loginForm.valid) {
      this.router.navigate(['admin-home']);
    }
  }
  
}
