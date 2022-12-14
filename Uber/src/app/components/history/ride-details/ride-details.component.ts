import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.css']
})
export class RideDetailsComponent {
  constructor(private router : Router) {}
  navigateBack() {
    this.router.navigate(['ride-history'])
  }
}
