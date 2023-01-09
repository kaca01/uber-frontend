import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNoteDialogComponent } from './dialogs/add-note-dialog/add-note-dialog.component';
import { NotesDialogComponent } from './dialogs/notes-dialog/notes-dialog.component';
import { DriversComponent } from './drivers/drivers.component';
import { PassengersComponent } from './passengers/passengers.component';
import { AddDriverComponent } from './drivers/add-driver/add-driver.component';
import { AddVehicleComponent } from './drivers/add-vehicle/add-vehicle.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { AppRoutingModule } from 'src/infrastructure/app-routing.module';

@NgModule({
  declarations: [
    AddNoteDialogComponent,
    NotesDialogComponent,
    DriversComponent,
    PassengersComponent,
    AddDriverComponent,
    AddVehicleComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NavBarModule,
  ]
})
export class ListOfUsersModule { }
