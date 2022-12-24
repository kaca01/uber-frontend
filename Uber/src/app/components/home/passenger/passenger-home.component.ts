import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'passenger-home',
  templateUrl: './passenger-home.component.html',
  styleUrls: ['./passenger-home.component.css'],
})
export class PassengerHomeComponent implements OnInit {
  orderForm = new FormGroup({
    pickup: new FormControl('', [Validators.required]),
    destination: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {

    const Menu = document.getElementById("menu-container");
    if(Menu != null) Menu.style.display = 'none';
    

    const LocationStar = document.getElementById("location-star");
    this.changeStar(LocationStar as HTMLImageElement);
    
    var DestinationStar = document.getElementById("destination-star");
    this.changeStar(DestinationStar as HTMLImageElement);
  }

  openDialog() : void {
    const Menu = document.getElementById("menu-container");
    if (Menu != null) {
      Menu.style.display = 'none';

      Menu.addEventListener('click', function open(event){
        const Form = document.getElementById("form");
        if (Form != null) Form.style.display = 'block';
        Menu.style.display = 'none';
      });
    }
  }

  closeDialog() : void {
    const Menu = document.getElementById("menu-container");
    const Close = document.getElementById("close-dialog");
    if (Close != null) {
      Close.addEventListener('click', function close(event){
        const Form = document.getElementById("form");
        if (Form != null) {
          Form.style.display = 'none';
          if (Menu != null) Menu.style.display = 'block';
          
        }
      });
    }
  }

  changeStar(Star : HTMLImageElement) : void {
    if (Star != null) {
      Star.addEventListener('click', function change(event){
        if (Star.getAttribute('src') == "../../../../assets/images/unfilled_star.png") {
          Star.setAttribute('src', "../../../../assets/images/star.png");
        } else {
          Star.setAttribute('src', "../../../../assets/images/unfilled_star.png");
        }
      });
    }
  }
}