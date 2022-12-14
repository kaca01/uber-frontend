import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passenger-history',
  templateUrl: './passenger-history.component.html',
  styleUrls: ['./passenger-history.component.css']
})
export class PassengerHistoryComponent {
  constructor(private router : Router) {}

  openDetails() {
      this.router.navigate(['passenger-details']);
  }
}
