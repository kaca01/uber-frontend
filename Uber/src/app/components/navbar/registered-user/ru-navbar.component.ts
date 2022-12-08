import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ru-navbar',
  templateUrl: './ru-navbar.component.html',
  styleUrls: ['./ru-navbar.component.css'],
})
export class RUNavbarComponent implements OnInit {
  constructor() {}

  isShowDivIf = true;
  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }
  
  ngOnInit(): void {}
}
