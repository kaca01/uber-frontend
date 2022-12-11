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

  ngOnInit(): void {}

  submit() {

  }
}