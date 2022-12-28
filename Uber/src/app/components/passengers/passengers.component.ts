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
  condition: boolean = true;
  all: Passenger[] = [];

  valueFromCreateComponent = '';

  @ViewChild(MatPaginator) paginator!: any;
  @ViewChild(MatSort) sort!: any;

  constructor(private passengerService: PassengerService) {}

  ngOnInit(): void {
    this.passengerService.selectedValue$.subscribe((value) => {
      this.valueFromCreateComponent = value;
    });

    this.passengerService.getAll().subscribe((res) => {
      this.all = res.results;
      this.dataSource = new MatTableDataSource<Passenger>(this.all);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  changeState() {
    this.condition = !this.condition;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getPassenger(passenger : Passenger) {
    alert("you have clicked");
  }
}

export interface All {
  totalCount : number;
  results: Passenger[];
}


export interface Passenger {
  _id: number;
  name: string;
  email: string;
  telephoneNumber: string;
  address: string;
  blocked: boolean;
  picture: string;
}
