import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Message } from 'src/app/domains';
import { from, map } from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { UserService } from '../../list-of-users/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationDialogComponent } from '../dialog/notification-dialog/notification-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private stompClient: any;
  isLoaded: boolean = false;
  isCustomSocketOpened = false;

  url: string = environment.apiHost + "api/notif";
  restUrl:string = environment.apiHost + "sendMessageRest";
  serverUrl: string = environment.apiHost + "notif";

  constructor(private http: HttpClient, private userService: UserService, private dialog: MatDialog) { }

  post(data: Message) {
    return this.http.post<Message>(this.url, data)
      .pipe(map((data: Message) => { return data; }));
  }

  postRest(data: Message) {
    return this.http.post<Message>(this.restUrl, data)
      .pipe(map((data: Message) => { return data; }));
  }

  // Funkcija za otvaranje konekcije sa serverom
  initializeWebSocketConnection() {
    console.log("USAO U INICIJALIZACIJU");
    // serverUrl je vrednost koju smo definisali u registerStompEndpoints() metodi na serveru
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.stompClient.connect({}, function () {
      console.log("INICIJALIZOVAO");
      that.isLoaded = true;
      that.openGlobalSocket();
      that.openSocket();
    });

  }

  openGlobalSocket() {
    if (this.isLoaded) {
      this.stompClient.subscribe("/socket-publisher", (message: { body: string; }) => {
        this.handleResult(message);
      });
    }
  }

  openSocket() {
    if (this.isLoaded) {
      console.log("PRETPLACEN");
      this.isCustomSocketOpened = true;
      let id = this.userService.currentUser?.id.toString();
      this.stompClient.subscribe("/socket-publisher/" + id, (message: { body: string; }) => {
        this.handleResult(message);
      });
    }
  }

  handleResult(message: { body: string; }) {
    console.log("usao u hendler");
    if (message.body) {
      let messageResult: Message = JSON.parse(message.body);
      console.log("IZ HENDLERA PORUKA PRIMLJENA");
      this.openDialog(messageResult);
      // this.messages.push(messageResult);
    }
  }

  sendMessageUsingSocket(notificationMessage: string, fromId: string, toId: string) {
      let message: Message = {
        message: notificationMessage,
        fromId: fromId,
        toId: toId
      };

      this.stompClient.send("/socket-subscriber/send/message", {}, JSON.stringify(message));
    
  }

  openDialog(message: Message) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;

    dialogConfig.data = message;
    this.dialog.open(NotificationDialogComponent, dialogConfig);
  }

  // Funkcija salje poruku na REST endpoint na serveru
  // sendMessageUsingRest() {
  //     let message: Message = {
  //       message: "poruka iz resta",
  //       fromId: "1",
  //       toId: "1"
  //     };

  //     this.postRest(message).subscribe(res => {
  //       console.log(res);
  //     })
    
  // }
}
