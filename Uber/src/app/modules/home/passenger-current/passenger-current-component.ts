import { Component, OnInit } from '@angular/core';
import { RideService } from '../service/ride.service';

@Component({
  selector: 'passenger-current',
  templateUrl: './passenger-current.component.html',
  styleUrls: ['./passenger-current.component.css'],
})
export class PassengerCurrentComponent implements OnInit {
  constructor(private rideService: RideService) {}
    hasRide = true;
  ngOnInit(): void {}

  panic(){
    this.rideService.panicButton();
  }
}