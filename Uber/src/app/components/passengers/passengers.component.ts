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
import { UserService } from 'src/app/service/user.service';
import { AddNoteDialogComponent } from '../dialogs/add-note-dialog/add-note-dialog.component';
import { NotesDialogComponent } from '../dialogs/notes-dialog/notes-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AllNotes, RequestNote, User } from 'src/app/domains';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css'],
})
export class PassengersComponent implements OnInit{
  selectedRowIndex : number = -1;
  displayedColumns: string[] = ['name', 'surname', 'email', 'telephoneNumber', 'address', 'blocked'];
  dataSource!: MatTableDataSource<User>;
  condition: boolean = true;
  all: User[] = [];
  message = '';
  private allNotes = {} as AllNotes;

  valueFromCreateComponent = '';
  private user = {} as User;

  @ViewChild(MatPaginator) paginator!: any;
  @ViewChild(MatSort) sort!: any;

  constructor(private userService: UserService, private dialog: MatDialog, private _snackBar: MatSnackBar) {}

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

  openDialog() {
    if(this.checkSelection()) return;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = this.allNotes.results;
    this.dialog.open(NotesDialogComponent, dialogConfig);
  }

  openAddNoteDialog() {
    if (this.checkSelection()) return;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this;

    const dialogRef = this.dialog.open(AddNoteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((res: any) => {
        this.selectedRowIndex = -1;
      });
    }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  changeState() {
    this.condition = !this.condition;
  }

  openSnackBar(snackMsg : string) : void {
    this._snackBar.open(snackMsg, "Dismiss", {
      duration: 2000
    });
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
    this.checkSelection();
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
    this.checkSelection();
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

  private checkSelection() : boolean {
    if(this.selectedRowIndex==-1){
      this.openSnackBar("User not selected!");
      return true;
    }
    return false;
  }
}