import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PassengerService } from 'src/app/service/passenger.service';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css'],
})
export class PassengersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'address', 'blocked'];
  dataSource!: MatTableDataSource<Passenger>;
  passengers: Passenger[] = [];
  condition: boolean = true;

  @ViewChild(MatPaginator) paginator!: any;
  @ViewChild(MatSort) sort!: any;

  constructor(private passengerService: PassengerService) {}

  ngOnInit(): void {
    this.passengers = this.passengerService.getAll();
    this.dataSource = new MatTableDataSource<Passenger>(this.passengers);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  changeState() {
    this.condition = !this.condition;
  }
}

export interface Passenger {
  _id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  blocked: boolean;
  picture: string;
}
