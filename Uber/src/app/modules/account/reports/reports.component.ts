import { Component, Input, OnInit } from '@angular/core';
import { Report } from 'src/app/domains';

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
    @Input()report1: Report[] = [];
    @Input()report2: Report[] = [];
    @Input()report3: Report[] = [];

    constructor() { }

    ngOnInit(): void { }
}
