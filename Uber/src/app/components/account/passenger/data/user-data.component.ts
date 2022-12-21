import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit{
  editForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', []),
  });
  
  ngOnInit(): void { 
  }
}
