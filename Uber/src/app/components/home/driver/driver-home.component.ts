import { Component } from '@angular/core';

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css']
})
export class DriverHomeComponent {
  constructor () {}

  ngOnInit() :void {
    const activityBtn = document.getElementById('activity-btn');
    

    if (activityBtn != null) {
      activityBtn.innerHTML = "ACTIVE";
      activityBtn.style.color = "black";
      
      
      activityBtn.addEventListener('click', function handleClick(event) {
        if (activityBtn.innerHTML == "ACTIVE") {
          activityBtn.innerHTML = "INACTIVE";
          activityBtn.style.color = "red";
        } else {
          activityBtn.innerHTML = "ACTIVE";
          activityBtn.style.color = "black";
        }

      });
    }
  }
}