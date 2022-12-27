import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DriverService } from 'src/app/service/driver.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css'],
})
export class DriversComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'address', 'blocked', 'changes'];
  dataSource!: MatTableDataSource<Driver>;
  all: Driver[] = [];
  condition: boolean = true;

  valueFromCreateComponent = '';

  @ViewChild(MatPaginator) paginator!: any;
  @ViewChild(MatSort) sort!: any;

  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
    this.driverService.selectedValue$.subscribe((value) => {
      this.valueFromCreateComponent = value;
    });

    this.driverService.getAll().subscribe((res) => {
      this.all = res.results;
      this.dataSource = new MatTableDataSource<Driver>(this.all);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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

export interface All {
  totalCount: number;
  results: Driver[];
}

export interface Driver {  
  _id: number;
  name: string;
  surname: string;
  email: string;
  telephoneNumber: string;
  address: string;
  blocked: boolean;
  picture: string;
  changes: boolean;
}

