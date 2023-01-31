import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/domains';
import { UserService } from '../../list-of-users/user.service';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MapService } from '../../map/map.service';

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css']
})
export class DriverHomeComponent implements OnInit{
  constructor (private userService : UserService, private router : Router, private mapService: MapService) {}

  ngOnInit(): void {
  }

    changeActivity(){
    const button = document.getElementById("activity-btn");
    if (button?.innerText == "ACTIVE"){
      this.userService.logoutDriver(this.userService.currentUser!.id).subscribe((res: any) => {
        let driver= res as Driver;
        //console.log(driver);
      });
      button.innerText = "INACTIVE";
      button.style.color = "red";
    }
    else if (button?.innerText == "INACTIVE"){
      button.innerText = "ACTIVE";
      button.style.color = "black";
      this.mapService.setDriverToActive(this.userService.currentUser!.id).subscribe((res: any) => {
        let driver= res as Driver;
        //console.log(driver);
      });
    }
  }
}