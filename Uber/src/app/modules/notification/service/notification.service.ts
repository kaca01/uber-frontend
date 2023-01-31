import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Message } from 'src/app/domains';
import { from, map } from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { UserService } from '../../list-of-users/user.service';

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

  constructor(private http: HttpClient, private userService: UserService) { }

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
      that.openGlobalSocket()
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

  // Funkcija koja se poziva kada server posalje poruku na topic na koji se klijent pretplatio
  handleResult(message: { body: string; }) {
    console.log("usao u hendler");
    if (message.body) {
      let messageResult: Message = JSON.parse(message.body);
      console.log("IZ HENDLERA PORUKA PRIMLJENA");
      // this.messages.push(messageResult);
    }
  }

    // Funkcija salje poruku na WebSockets endpoint na serveru
  sendMessageUsingSocket(fromId: string, toId: string) {
      let message: Message = {
        message: "poruka soketttt",
        fromId: fromId,
        toId: toId
      };

      // Primer slanja poruke preko web socketa sa klijenta. URL je 
      //  - ApplicationDestinationPrefix definisan u config klasi na serveru (configureMessageBroker() metoda) : /socket-subscriber
      //  - vrednost @MessageMapping anotacije iz kontrolera na serveru : /send/message
      this.stompClient.send("/socket-subscriber/send/message", {}, JSON.stringify(message));
    
  }

  // Funckija salje poruku na REST endpoint na serveru
  sendMessageUsingRest() {
      let message: Message = {
        message: "poruka iz resta",
        fromId: "1",
        toId: "1"
      };

      this.postRest(message).subscribe(res => {
        console.log(res);
      })
    
  }
}
