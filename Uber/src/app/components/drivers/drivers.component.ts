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
import { AddNoteDialogComponent } from '../notes-dialog/add-note-dialog/add-note-dialog.component';
import { NotesDialogComponent } from '../notes-dialog/notes-dialog.component';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css'],
})
export class DriversComponent implements OnInit {
  public selectedRowIndex : number = -1;
  displayedColumns: string[] = ['name', 'email', 'telephoneNumber', 'address', 'blocked', 'changes'];
  dataSource!: MatTableDataSource<User>;
  all: User[] = [];
  private allNotes = {} as AllNotes;
  condition: boolean = true;
  public message = '';
  valueFromCreateComponent = '';
  public user = {} as User;

  @ViewChild(MatPaginator) paginator!: any;
  @ViewChild(MatSort) sort!: any;

  constructor(private driverService: DriverService, private dialog: MatDialog) {
    
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = this.allNotes.results;
    this.dialog.open(NotesDialogComponent, dialogConfig);
  }

  openAddNoteDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = this;

    this.dialog.open(AddNoteDialogComponent, dialogConfig);
    this.selectedRowIndex = -1;
  }

  ngOnInit(): void {
    this.driverService.selectedValue$.subscribe((value) => {
      this.valueFromCreateComponent = value;
    });

    this.driverService.getAllDrivers().subscribe((res) => {
      this.all = res.results;
      this.dataSource = new MatTableDataSource<User>(this.all);
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

  getDriver(driver : User) {
    const block = document.getElementById("block");
    this.selectedRowIndex=driver.id;
    this.user = driver;
    if (block != null) {
      if (this.user.blocked == true) block.innerText = "UNBLOCK";
      else block.innerText = "BLOCK";
    }
    this.getNotes();
  }

  blockUser() : void{
    const block = document.getElementById("block");
    if (this.user.blocked == true) {
      this.unblockUser();
      return;
    }
    this.user.blocked = true;
    if (block != null) block.innerText = "UNBLOCK";
    this.driverService.block(this.user.id).subscribe();
  }

  unblockUser() : void {
    const block = document.getElementById("block");
    this.user.blocked = false;
    if (block != null) block.innerText = "BLOCK";
    this.driverService.unblock(this.user.id).subscribe();
  }

  getNotes() : void {
    console.log(this.user.id);
    this.driverService.getNotes(this.user.id)
    .subscribe((res: any) => {
      this.allNotes = res;
    }); 
  }
}

export interface All {
  totalCount: number;
  results: User[];
}

export interface User {  
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

export interface AllNotes {
  totalCount: number;
  results: Note[];
}

export interface Note {
  id: number;
  date: string;
  message: string;
}

export interface RequestNote {
  message: string;
}

