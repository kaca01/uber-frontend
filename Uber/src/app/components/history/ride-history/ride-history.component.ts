import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ride-history',
  templateUrl: './ride-history.component.html',
  styleUrls: ['./ride-history.component.css']
})
export class RideHistoryComponent {
  constructor(private router : Router) {}

  openDetails() {
      this.router.navigate(['ride-details']);
  }
}
