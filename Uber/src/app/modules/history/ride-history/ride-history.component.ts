import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AllRides } from 'src/app/domains';
import { HistoryService } from 'src/app/modules/history/history.service';
import { PassengersComponent } from '../../list-of-users/passengers/passengers.component';
import { UserService } from '../../list-of-users/user.service';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  selector: 'app-ride-history',
  templateUrl: './ride-history.component.html',
  styleUrls: ['./ride-history.component.css']
})
export class RideHistoryComponent implements OnInit {
  all : AllRides = {} as AllRides;
  baseComponent : BasePageComponent = new BasePageComponent(this.userService);
  private chosenRide : number = -1;
  public chosenUser : number = -1;
  constructor(private service : HistoryService, private userService: UserService) {}
  
  ngOnInit(): void {
    if (this.userService.currentUser != undefined) {
      this.service.currentMessage.subscribe(message => this.chosenRide = message);
        if (this.userService.currentUser.roles[0].name === "ROLE_PASSENGER") {
          this.service.getPassengerHistory(this.userService.currentUser.id).subscribe((res) => {
            this.all = res;
          });
        } else if (this.userService.currentUser.roles[0].name === "ROLE_DRIVER") {
          this.service.getDriverHistory(this.userService.currentUser.id).subscribe((res) => {
            this.all = res;
          });
        }
      
    }

    this.service.currentUserMessage.subscribe(message => {
      this.chosenUser = message;
      this.userService.getRole(this.chosenUser).subscribe((res) => {
        if (res.name === "ROLE_PASSENGER")
        this.service.getPassengerHistory(this.chosenUser).subscribe((res) => {
          this.all = res;
        });
        else {
          this.service.getDriverHistory(this.chosenUser).subscribe((res) => {
            this.all = res;
          });
        }
      });
    });
  }

  openDetails(id : number) {
    this.baseComponent.display("details");
    this.chosenRide = id;
    this.sendMessage();
  }

  sendMessage() {
    this.service.sendMessage(this.chosenRide);
  }
  
}
