import {
  AfterViewInit,
  ChangeDetectorRef,
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
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css'],
})
export class PassengersComponent implements OnInit{
  selectedRowIndex : number = -1;
  displayedColumns: string[] = ['name', 'email', 'telephoneNumber', 'address', 'blocked'];
  dataSource!: MatTableDataSource<User>;
  condition: boolean = true;
  all: User[] = [];
  message = '';
  private requestNote = {} as RequestNote;
  private allNotes = {} as AllNotes;

  valueFromCreateComponent = '';
  private user = {} as User;

  @ViewChild(MatPaginator) paginator!: any;
  @ViewChild(MatSort) sort!: any;

  constructor(private userService: DriverService, private dialog: MatDialog) {}

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
    this.userService.selectedValue$.subscribe((value) => {
      this.valueFromCreateComponent = value;
    });

    this.userService.getAllPassengers().subscribe((res) => {
      this.all = res.results;
      this.dataSource = new MatTableDataSource<User>(this.all);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  changeState() {
    this.condition = !this.condition;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getPassenger(passenger : User) {
    const block = document.getElementById("block");
    this.selectedRowIndex=passenger.id;
    this.user = passenger;
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
    this.userService.block(this.user.id).subscribe();
  }

  unblockUser() : void {
    const block = document.getElementById("block");
    this.user.blocked = false;
    if (block != null) block.innerText = "BLOCK";
    this.userService.unblock(this.user.id).subscribe();
  }

  getNotes() : void {
    this.userService.getNotes(this.user.id)
    .subscribe((res: any) => {
      this.allNotes = res;
    }); 
  }
}

export interface All {
  totalCount : number;
  results: User[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  telephoneNumber: string;
  address: string;
  blocked: boolean;
  picture: string;
}

export interface AllNotes {
  totalCount: number;
  results: Note[];
}

export interface RequestNote {
  message: string;
}

export interface Note {
  id: number;
  date: string;
  message: string;
}
