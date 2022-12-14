import { Injectable } from '@angular/core';
import { Passenger } from '../components/passengers/passengers.component';

const PASSENGERS = [
  {
    _id: 1,
    name: 'Milan Vojkovic',
    email: 'milanvojke@gmail.com',
    phone: '+387 61 526 7956',
    address: 'Bulevar Despota Stefana 5A',
    blocked: false,
    picture: 'saint_cosme.jpg',
  },
  {
    _id: 2,
    name: 'Ognjen Vojkovic',
    email: 'ognjenvojke@gmail.com',
    phone: '+387 61 526 7956',
    address: 'Bulevar Despota Stefana 7',
    blocked: false,
    picture: 'saint_cosme.jpg',
  },
  {
    _id: 3,
    name: 'Marko Vojkovic',
    email: 'markovojke@gmail.com',
    phone: '+387 61 526 7956',
    address: 'Bulevar Oslobodjenja',
    blocked: true,
    picture: 'saint_cosme.jpg',
  },
  {
    _id: 4,
    name: 'Milos Vojkovic',
    email: 'milosvojke@gmail.com',
    phone: '+387 61 526 7956',
    address: 'Nikole Pasica 25',
    blocked: false,
    picture: 'saint_cosme.jpg',
  },
  {
    _id: 5,
    name: 'Bogdan Vojkovic',
    email: 'bogdanvojke@gmail.com',
    phone: '+387 61 526 7956',
    address: 'Matice Srpske 4',
    blocked: true,
    picture: 'saint_cosme.jpg',
  },{
    _id: 6,
    name: 'Srdjan Vojkovic',
    email: 'srdjanvojke@gmail.com',
    phone: '+387 61 526 7956',
    address: 'Ive Andrica 14',
    blocked: false,
    picture: 'saint_cosme.jpg',
  },
  {
    _id: 7,
    name: 'Nikola Vojkovic',
    email: 'nikolavojke@gmail.com',
    phone: '+387 61 526 7956',
    address: 'Nikole Pasica 25',
    blocked: false,
    picture: 'saint_cosme.jpg',
  },
  {
    _id: 8,
    name: 'Jana Vojkovic',
    email: 'janavojke@gmail.com',
    phone: '+387 61 526 7956',
    address: 'Nikole Pasica 25',
    blocked: false,
    picture: 'saint_cosme.jpg',
  },
  {
    _id: 9,
    name: 'Ivana Vojkovic',
    email: 'ivanavojke@gmail.com',
    phone: '+387 61 526 7956',
    address: 'Kosovke djevojke 14',
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