import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'uu-home',
  templateUrl: './uu-home.component.html',
  styleUrls: ['./uu-home.component.css'],
})
export class UUHomeComponent implements OnInit {
  orderForm = new FormGroup({
    pickup: new FormControl('', [Validators.required]),
    destination: new FormControl('', [Validators.required]),
  });
  constructor() {}

  ngOnInit(): void {
    const Menu = document.getElementById("menu-btn");
    this.openDialog(Menu as HTMLButtonElement);
    this.closeDialog(Menu as HTMLButtonElement);
  }

  openDialog(Menu : HTMLButtonElement) : void {
    if (Menu != null) {
      Menu.style.display = 'none';

      Menu.addEventListener('click', function open(event){
        const Form = document.getElementById("form");
        if (Form != null) Form.style.display = 'block';
        Menu.style.display = 'none';
      });
    }
  }

  closeDialog(Menu : HTMLButtonElement) : void {
    const Close = document.getElementById("close-dialog");
    if (Close != null) {
      Close.addEventListener('click', function close(event){
        const form = document.getElementById("form");
        if (form != null) {
          form.style.display = 'none';
          if (Menu != null) Menu.style.display = 'block';
        }
      });
    }
  }
}