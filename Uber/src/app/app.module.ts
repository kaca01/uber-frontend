import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTreeModule } from '@angular/material/tree';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '../infrastructure/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/infrastructure/material.module';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';

import {ApiService} from './service/api.service';
import {AuthService} from './service/auth.service';
import {ConfigService} from './service/config.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';import { AuthModule } from './modules/auth/auth.module';
import { AccountModule } from './modules/account/account.module';
import { HomeModule } from './modules/home/home.module';
import { HistoryModule } from './modules/history/history.module';
import { ListOfUsersModule } from './modules/list-of-users/list-of-users.module';
import { MapModule } from './modules/map/map.module';
import { NavBarModule } from './modules/nav-bar/nav-bar.module';
;


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatTreeModule,
    HttpClientModule,
    AuthModule,
    AccountModule,
    HomeModule,
    HistoryModule,
    ListOfUsersModule,
    MapModule,
    NavBarModule
  ],
  providers: [
    {
      // provide: MatDialogRef, 
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
      // useValue: {}
    },
    AuthService,
    ApiService,
    UserService,
    ConfigService,
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
  // entryComponents: [NotesDialogComponent]
})
export class AppModule { }
