import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { from, map } from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { UserService } from '../../list-of-users/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationDialogComponent } from '../dialog/notification-dialog/notification-dialog.component';
import { Panic } from 'src/app/domains';
import { PanicNotificationComponent } from '../dialog/panic-notification/panic-notification.component';

@Injectable({
  providedIn: 'root'
})
export class PanicService {
  private stompClient: any;
  isLoaded: boolean = false;

  url: string = environment.apiHost + "api/panic";
  serverUrl: string = environment.apiHost + "panic";

  public message: Panic = {} as Panic;

  constructor(private http: HttpClient, private userService: UserService, private dialog: MatDialog) { }

  post(data: Panic) {
    return this.http.post<Panic>(this.url, data)
      .pipe(map((data: Panic) => { return data; }));
  }

  // Funkcija za otvaranje konekcije sa serverom
  initializeWebSocketConnection() {
    console.log("USAO U INICIJALIZACIJU");
    // serverUrl je vrednost koju smo definisali u registerStompEndpoints() metodi na serveru (WebSockerCoonfig.java)
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.stompClient.connect({},  () => {
      console.log("INICIJALIZOVAO 2");
      that.isLoaded = true;
      if(this.userService.currentUser?.roles.find(x => x.authority === "ROLE_ADMIN"))
        that.openGlobalSocket();
    });
  }

  openGlobalSocket() {
    if (this.isLoaded) {
      console.log("PRETPLACEN 2");
      this.stompClient.subscribe("/socket-publisher", (message: { body: string; }) => {
        this.handleResult(message);
      });
    }
  }

  handleResult(message: { body: string; }) {
    if (message.body) {
      let messageResult: Panic = JSON.parse(message.body);
      console.log("IZ HENDLERA PORUKA PRIMLJENA");
      this.openDialog(messageResult);
    }
  }

  sendMessageUsingSocket(user: string, reason: string, vehicle: string) {
      let message: Panic = {
        user: user,
        reason: reason,
        licenseNum: vehicle
      };

      this.stompClient.send("/socket-subscriber/send/panic", {}, JSON.stringify(message));
  }

  openDialog(message: Panic) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;

    this.message = message;
    dialogConfig.data = this.message;
    this.dialog.open(PanicNotificationComponent, dialogConfig);
  }
}
