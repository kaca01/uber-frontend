import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RxStomp } from '@stomp/rx-stomp';
import * as SockJS from 'sockjs-client';
import { map } from 'rxjs/operators';

  export class NotificationsService {
    private client: RxStomp | undefined;
    public notifications: string[] = [];
  
    connectClicked() {
      if (!this.client || !this.client.connected()) {
        this.client = new RxStomp();
        this.client.configure({
          //webSocketFactory: () => new SockJS('http://localhost:8081/notifications'),
          debug: (msg: string) => console.log(msg)
        });
        this.client.activate();
  
        this.watchForNotifications();
  
        console.info('connected!');
      }
    }
  
    private watchForNotifications() {
      if(this.client){
      this.client.watch('/user/notification/item')
        .pipe(
          map((response) => {
            const text: string = JSON.parse(response.body).text;
            console.log('Got ' + text);
            return text;
          }))
        .subscribe((notification: string) => this.notifications.push(notification));
    }
  }
  
    disconnectClicked() {
      if (this.client && this.client.connected()) {
        this.client.deactivate();
        this.client = new RxStomp;
        console.info("disconnected :-/");
      }
    }
  
    startClicked() {
      if (this.client && this.client.connected()) {
        this.client.publish({destination: '/swns/start'});
      }
    }
  
    stopClicked() {
      if (this.client && this.client.connected()) {
        this.client.publish({destination: '/swns/stop'});
      }
    }
  }