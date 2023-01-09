import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNoteDialogComponent } from './dialogs/add-note-dialog/add-note-dialog.component';
import { NotesDialogComponent } from './dialogs/notes-dialog/notes-dialog.component';
import { DriversComponent } from './drivers/drivers.component';
import { PassengersComponent } from './passengers/passengers.component';



@NgModule({
  declarations: [
    AddNoteDialogComponent,
    NotesDialogComponent,
    DriversComponent,
    PassengersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ListOfUsersModule { }
