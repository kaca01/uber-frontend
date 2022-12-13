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
    const menu = document.getElementById("menu-btn");
    
    if (menu != null) {
      menu.style.display = 'none';

      menu.addEventListener('click', function open(event){
        const form = document.getElementById("form");
        if (form != null) {
          form.style.display = 'block';
        }
        menu.style.display = 'none';
      });
    }

    const close = document.getElementById("close-dialog");
    if (close != null) {
      close.addEventListener('click', function close(event){
        const form = document.getElementById("form");
        if (form != null) {
          form.style.display = 'none';

          if (menu != null) {
            menu.style.display = 'block';
          }
        }
      });
    }
  }

  order(){}
}