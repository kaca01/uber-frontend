import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { HistoryService } from 'src/app/modules/history/history.service';
import { BasePageComponent } from '../base-page/base-page.component';
import { AllRides, Ride } from 'src/app/domains';
import { UserService } from '../../list-of-users/user.service';

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.css']
})
export class RideDetailsComponent implements OnInit{
  private basePage : BasePageComponent = new BasePageComponent();
  all : AllRides = {} as AllRides;
  ride : Ride = {} as Ride;
  chosenRide : number = -1;
  constructor(private service : HistoryService, private userService: UserService) {}

  ngOnInit(): void {
    if (this.userService.currentUser != undefined)
    this.service.getPassengerHistory(this.userService.currentUser.id).subscribe((res) => {
      this.all = res;
    });
    this.service.currentMessage.subscribe(message => {
      this.chosenRide = message;
      if (this.all.results != undefined) this.ride = this.all.results[this.chosenRide];
    });

  }

  backToHistory() : void {
    this.basePage.display("history");
  }

  openRatings() : void {
    this.basePage.display("ratings");
  }
}
