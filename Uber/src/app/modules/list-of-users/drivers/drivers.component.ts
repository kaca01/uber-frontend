import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/modules/list-of-users/user.service';
import { AddNoteDialogComponent } from '../dialogs/add-note-dialog/add-note-dialog.component';
import { NotesDialogComponent } from '../dialogs/notes-dialog/notes-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AllNotes, User } from 'src/app/domains';
import { DriverChangesComponent } from '../dialogs/driver-changes/driver-changes.component';
import { BasePageComponent } from '../../history/base-page/base-page.component';
import { Router } from '@angular/router';
import { HistoryService } from '../../history/history.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css'],
})
export class DriversComponent implements OnInit {
  base : BasePageComponent = new BasePageComponent(this.userService);
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

  constructor(private userService: UserService,
              private historyService: HistoryService,
              private dialog: MatDialog, 
              private _snackBar: MatSnackBar,
              private router: Router) {}
  
  ngOnInit(): void {
    this.userService.selectedValue$.subscribe((value) => {
      this.valueFromCreateComponent = value;
    });

    this.getAllDrivers();
  }

  getAllDrivers() {
    this.userService.getAllDrivers().subscribe((res) => {
      console.log(res);
      this.all = res.results;
      this.dataSource = new MatTableDataSource<User>(this.all);
      this.dataSource.data = this.all;
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
    this.selectedRowIndex=driver.id;
    this.user = driver;
    if (this.user.blocked == true) this.changeBlockButton(0);
    else this.changeBlockButton(1);
    this.getNotes();
  }

  // notes
  openDialog() {
    if(this.checkIfSelected()) return;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = this.allNotes.results;
    this.dialog.open(NotesDialogComponent, dialogConfig);
  }

  getNotes() : void {
    this.userService.getNotes(this.user.id)
    .subscribe((res: any) => {
      this.allNotes = res;
    }); 
  }  

  openAddNoteDialog() {
    if(this.checkIfSelected()) return;

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this;

    const dialogRef = this.dialog.open(AddNoteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((res: any) => {
      this.selectedRowIndex = -1;
    });
  }

  // blocking
  blockUser() : void{
    this.checkIfSelected();
    if (this.user.blocked == true) {
      this.unblockUser();
      return;
    }
    this.user.blocked = true;
    this.changeBlockButton(0);
    this.userService.block(this.user.id).subscribe();
  }

  unblockUser() : void {
    this.checkIfSelected();
    this.user.blocked = false;
    this.changeBlockButton(1);
    this.userService.unblock(this.user.id).subscribe();
  }

  changeBlockButton(change : number) {
    const block = document.getElementById("block");
    if (block) {
      if (change == 0) block.innerText = "UNBLOCK";
      else block.innerText = "BLOCK";
    }
  }

  openSnackBar(snackMsg : string) : void {
    this._snackBar.open(snackMsg, "Dismiss", {
      duration: 2000
    });
  }

  private checkIfSelected() : boolean {
    if(this.selectedRowIndex==-1){
      this.openSnackBar("User not selected!");
      return true;
    }
    return false;
  }

  getChanges() {
    if(!this.checkIfSelected()) {
      if(this.user['changed']) {
        this.userService.getChanges(this.user.id).subscribe((res: any) => {
          res['id'] = this.selectedRowIndex;

          const dialogConfig = new MatDialogConfig();

          dialogConfig.disableClose = false;
          dialogConfig.autoFocus = true;
          dialogConfig.data = res;
          const dialogRef = this.dialog.open(DriverChangesComponent, dialogConfig);

          dialogRef.afterClosed().subscribe(result => {
            if(result.event == 'Accept')
              this.setDriver(res);
          })
        }); 
      }
      else 
        this.openSnackBar("The selected driver has no changes!");
    }
  }

  setDriver(editDriver: User) {
    this.all.forEach(element => {
      if(element['id'] === this.selectedRowIndex){
        element['name'] = editDriver['name'];
        element['surname'] = editDriver['surname'];
        element['address'] = editDriver['address'];
        element['telephoneNumber'] = editDriver['telephoneNumber'];
        element['changed'] = false;
      }
    });
    this.dataSource = new MatTableDataSource<User>(this.all);
  }

  // history
  openHistory() {
    if(this.checkIfSelected()) return;
    this.sendUserId();
    this.router.navigate(['/base-page']);
  }

  sendUserId() {
    console.log(this.user.id);
    this.historyService.sendUserId(this.user.id);
  }
}