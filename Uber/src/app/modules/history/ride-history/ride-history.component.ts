import { Component, OnInit } from '@angular/core';
import { AllRides } from 'src/app/domains';
import { HistoryService } from 'src/app/modules/history/history.service';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  selector: 'app-ride-history',
  templateUrl: './ride-history.component.html',
  styleUrls: ['./ride-history.component.css']
})
export class RideHistoryComponent implements OnInit {
  all : AllRides = {} as AllRides;
  baseComponent : BasePageComponent = new BasePageComponent();
  private chosenRide : number = -1;
  constructor(private service : HistoryService) {}
  
  ngOnInit(): void {
    this.service.currentMessage.subscribe(message => this.chosenRide = message);
    this.service.getHistory().subscribe((res) => {
      this.all = res;
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
