import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './map-component/map.component';
import { NavBarModule } from '../nav-bar/nav-bar.module';

@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NavBarModule
  ],
  exports: [MapComponent],
})
export class MapModule { }
