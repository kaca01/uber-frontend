import { Injectable } from '@angular/core';
import { Passenger } from '../components/passengers/passengers.component';

const PASSENGERS = [
  {
    _id: 1,
    name: 'Vojko Vojkovic',
    email: 'vojkovojkovic@gmail.com',
    phone: '+387 61 526 7956',
    address: 'Bulevar Despota Stefana 5A',
    blocked: false,
    picture: 'saint_cosme.jpg',
  },
  {
    _id: 2,
    name: 'Vojko Vojkovic',
    email: 'vojkovojkovic@gmail.com',
    phone: '+387 61 526 7956',
    address: 'Bulevar Despota Stefana 5A',
    blocked: false,
    picture: 'saint_cosme.jpg',
  },
  {
    _id: 3,
    name: 'Vojko Vojkovic',
    email: 'vojkovojkovic@gmail.com',
    phone: '+387 61 526 7956',
    address: 'Bulevar Despota Stefana 5A',
    blocked: true,
    picture: 'saint_cosme.jpg',
  },
  {
    _id: 4,
    name: 'Vojko Vojkovic',
    email: 'vojkovojkovic@gmail.com',
    phone: '+387 61 526 7956',
    address: 'Bulevar Despota Stefana 5A',
    blocked: false,
    picture: 'saint_cosme.jpg',
  },
  {
    _id: 5,
    name: 'Vojko Vojkovic',
    email: 'vojkovojkovic@gmail.com',
    phone: '+387 61 526 7956',
    address: 'Bulevar Despota Stefana 5A',
    blocked: false,
    picture: 'saint_cosme.jpg',
  },{
    _id: 6,
    name: 'Vojko Vojkovic',
    email: 'vojkovojkovic@gmail.com',
    phone: '+387 61 526 7956',
    address: 'Bulevar Despota Stefana 5A',
    blocked: false,
    picture: 'saint_cosme.jpg',
  },
  
];

@Injectable({
  providedIn: 'root',
})
export class PassengerService {
  private passengerList: Passenger[] = [];

  constructor() {
    for (let passengerObj of PASSENGERS) {
      const passenger: Passenger = {
        _id: passengerObj._id,
        name: passengerObj.name,
        email: passengerObj.email,
        phone: passengerObj.phone,
        address: passengerObj.address,
        blocked: passengerObj.blocked,
        picture: passengerObj.picture,
      };
      this.passengerList.push(passenger);
    }
  }

  getAll(): Passenger[] {
    return this.passengerList;
  }

  add(passenger: any): void {
    this.passengerList.push(passenger);
  }
}