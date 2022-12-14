import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.css']
})
export class PassengerDetailsComponent {
  constructor(private router : Router) {}
  navigateBack() {
    this.router.navigate(['passenger-history'])
  }
}
