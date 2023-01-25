import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  route: string[] = [];
  private messageSource = new BehaviorSubject<string[]>(this.route);
  currentMessage = this.messageSource.asObservable();
  constructor(private http: HttpClient) {}

  search(street: string): Observable<any> {
    return this.http.get(
      'https://nominatim.openstreetmap.org/search?format=json&q=' + street
    );
  }

  reverseSearch(lat: number, lon: number): Observable<any> {
    return this.http.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&<params>`
    );
  }

  sendRoute(route: string[]) {
    this.messageSource.next(route);
  }
}
