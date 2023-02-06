import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Driver, Ride, Vehicle, Location } from 'src/app/domains';
import { environment } from 'src/environments/environment.prod';
import { ApiService } from '../auth/services/api.service';

@Injectable({
    providedIn: 'root',
  })
  export class SimulationService {
    
  
    constructor() {
        
      }
  
  }
  