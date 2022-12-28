import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLinkWithHref } from '@angular/router';
import { DriverService } from 'src/app/service/driver.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css'],
})
export class DriversComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'telephoneNumber', 'address', 'blocked', 'changes'];
  dataSource!: MatTableDataSource<Driver>;
  all: Driver[] = [];
  condition: boolean = true;

  valueFromCreateComponent = '';
  private driver = {} as Driver;

  @ViewChild(MatPaginator) paginator!: any;
  @ViewChild(MatSort) sort!: any;

  constructor(private driverService: DriverService) {
  }

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
    this.driver = driver;
  }

  blockUser() : void{
    if (this.driver.blocked == true) {
      this.unblockUser();
      return;
    }
    this.driver.blocked = true;
    this.driverService.block(this.driver.id).subscribe();
  }

  unblockUser() : void {
    this.driver.blocked = false;
    this.driverService.unblock(this.driver.id).subscribe();
  }
}

export interface All {
  totalCount: number;
  results: Driver[];
}

export interface Driver {  
  id: number;
  name: string;
  surname: string;
  email: string;
  telephoneNumber: string;
  address: string;
  blocked: boolean;
  picture: string;
  changes: boolean;
}

