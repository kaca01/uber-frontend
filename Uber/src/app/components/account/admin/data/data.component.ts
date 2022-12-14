import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit{
  editForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', []),
  });
  
  ngOnInit(): void { 
  }
}
