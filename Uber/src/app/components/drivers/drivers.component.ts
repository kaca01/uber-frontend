import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DriverService } from 'src/app/service/driver.service';
import { UserService, AllNotes, RequestNote } from 'src/app/service/user.service';
import { NotesDialogComponent } from '../notes-dialog/notes-dialog.component';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css'],
})
export class DriversComponent implements OnInit {
  selectedRowIndex : number = -1;
  displayedColumns: string[] = ['name', 'email', 'telephoneNumber', 'address', 'blocked', 'changes'];
  dataSource!: MatTableDataSource<Driver>;
  all: Driver[] = [];
  private allNotes = {} as AllNotes;
  condition: boolean = true;
  message = '';
  private requestNote = {} as RequestNote;

  valueFromCreateComponent = '';
  private driver = {} as Driver;

  @ViewChild(MatPaginator) paginator!: any;
  @ViewChild(MatSort) sort!: any;

  constructor(private driverService: DriverService, private userService: UserService, 
    private dialog: MatDialog) {}

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = this.allNotes.results;
    this.dialog.open(NotesDialogComponent, dialogConfig);
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
    const block = document.getElementById("block");
    this.selectedRowIndex=driver.id;
    this.driver = driver;
    if (block != null) {
      if (this.driver.blocked == true) block.innerText = "UNBLOCK";
      else block.innerText = "BLOCK";
    }
    this.getNotes();
  }

  blockUser() : void{
    const block = document.getElementById("block");
    if (this.driver.blocked == true) {
      this.unblockUser();
      return;
    }
    this.driver.blocked = true;
    if (block != null) block.innerText = "UNBLOCK";
    this.userService.block(this.driver.id).subscribe();
  }

  unblockUser() : void {
    const block = document.getElementById("block");
    this.driver.blocked = false;
    if (block != null) block.innerText = "BLOCK";
    this.userService.unblock(this.driver.id).subscribe();
  }

  addNote() : void {
    if(this.message != '') {
      this.requestNote["message"] = this.message;
      this.userService.addNote(this.driver.id, this.requestNote)
      .subscribe((res: any) => {
        console.log("all notes");
        console.log(this.allNotes);
        this.selectedRowIndex = -1;
      });
    }
  }

  getNotes() : void {
    console.log(this.driver.id);
    this.userService.getNotes(this.driver.id)
    .subscribe((res: any) => {
      this.allNotes = res;
    }); 
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