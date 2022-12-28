import { LiveAnnouncer } from '@angular/cdk/a11y';
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
import { PassengerService } from 'src/app/service/passenger.service';
import { NotesDialogComponent } from '../notes-dialog/notes-dialog.component';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css'],
})
export class PassengersComponent implements OnInit{
  displayedColumns: string[] = ['name', 'email', 'telephoneNumber', 'address', 'blocked'];
  dataSource!: MatTableDataSource<Passenger>;
  condition: boolean = true;
  all: Passenger[] = [];
  message = '';
  private requestNote = {} as RequestNote;
  private allNotes = {} as AllNotes;

  valueFromCreateComponent = '';
  private passenger = {} as Passenger;

  @ViewChild(MatPaginator) paginator!: any;
  @ViewChild(MatSort) sort!: any;

  constructor(private passengerService: PassengerService, private dialog: MatDialog) {}

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = this.allNotes.results;
    this.dialog.open(NotesDialogComponent, dialogConfig);
  }

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

  getPassenger(passenger : Passenger) {
    this.passenger = passenger;
    this.getNotes();
  }

  blockUser() : void{
    if (this.passenger.blocked == true) {
      this.unblockUser();
      return;
    }
    this.passenger.blocked = true;
    this.passengerService.block(this.passenger.id).subscribe();
  }

  unblockUser() : void {
    this.passenger.blocked = false;
    this.passengerService.unblock(this.passenger.id).subscribe();
  }

  addNote() : void {
    if(this.message != '') {
      this.requestNote["message"] = this.message;
      this.passengerService.addNote(this.passenger.id, this.requestNote)
      .subscribe((res: any) => {
      });
    }
  }

  getNotes() : void {
    this.passengerService.getNotes(this.passenger.id)
    .subscribe((res: any) => {
      this.allNotes = res;
    }); 
  }
}

export interface All {
  totalCount : number;
  results: Passenger[];
}

export interface Passenger {
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
