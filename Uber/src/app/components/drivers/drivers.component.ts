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
import { DriverService } from 'src/app/service/driver.service';

@Component({
  selector: 'app-passengers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css'],
})
export class DriversComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'address', 'blocked', 'changes'];
  dataSource!: MatTableDataSource<Driver>;
  drivers: Driver[] = [];
  condition: boolean = true;

  @ViewChild(MatPaginator) paginator!: any;
  @ViewChild(MatSort) sort!: any;

  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
    this.drivers = this.driverService.getAll();
    this.dataSource = new MatTableDataSource<Driver>(this.drivers);
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

  getDriver(driver : Driver) {
    alert("you have clicked");
  }
}

export interface Driver {
  _id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  blocked: boolean;
  picture: string;
  changes: boolean;
}
