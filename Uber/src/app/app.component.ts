import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Uber';

  welcomeForm = new FormGroup({

  });

  constructor(private router: Router){}

  welcome() {
    this.router.navigate(['registration']);
  }
}
