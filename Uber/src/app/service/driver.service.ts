import { Injectable } from '@angular/core';
import { Driver } from '../components/drivers/drivers.component';

const DRIVERS = [
  {
    _id: 1,
    name: 'Milan Vojkovic',
    email: 'milanvojke@gmail.com',
    phone: '+387 61 526 7956',
    address: 'Bulevar Despota Stefana 5A',
    blocked: false,
    picture: 'saint_cosme.jpg',
    changes: false,
  },
  {
    _id: 2,
    name: 'Ognjen Vojkovic',
    email: 'ognjenvojke@gmail.com',
    phone: '+387 61 526 7956',
    address: 'Bulevar Despota Stefana 7',
    blocked: false,
    picture: 'saint_cosme.jpg',
    changes: false,
  },
  {
    _id: 3,
    name: 'Marko Vojkovic',
    email: 'markovojke@gmail.com',
    phone: '+387 61 526 7956',
    address: 'Bulevar Oslobodjenja',
    blocked: true,
    picture: 'saint_cosme.jpg',
    changes: true,
  },
  {
    _id: 4,
    name: 'Milos Vojkovic',
    email: 'milosvojke@gmail.com',
    phone: '+387 61 526 7956',
    address: 'Nikole Pasica 25',
    blocked: false,
    picture: 'saint_cosme.jpg',
    changes: false,
  },
  {
    _id: 5,
    name: 'Bogdan Vojkovic',
    email: 'bogdanvojke@gmail.com',
    phone: '+387 61 526 7956',
    address: 'Matice Srpske 4',
    blocked: true,
    picture: 'saint_cosme.jpg',
    changes: false,
  },{
    _id: 6,
    name: 'Srdjan Vojkovic',
    email: 'srdjanvojke@gmail.com',
    phone: '+387 61 526 7956',
    address: 'Ive Andrica 14',
    blocked: false,
    picture: 'saint_cosme.jpg',
    changes: true,
  },
  {
    _id: 7,
    name: 'Nikola Vojkovic',
    email: 'nikolavojke@gmail.com',
    phone: '+387 61 526 7956',
    address: 'Nikole Pasica 25',
    blocked: false,
    picture: 'saint_cosme.jpg',
    changes: false,
  },
  {
    _id: 8,
    name: 'Jana Vojkovic',
    email: 'janavojke@gmail.com',
    phone: '+387 61 526 7956',
    address: 'Nikole Pasica 25',
    blocked: false,
    picture: 'saint_cosme.jpg',
    changes: false,
  },
  {
    _id: 9,
    name: 'Ivana Vojkovic',
    email: 'ivanavojke@gmail.com',
    phone: '+387 61 526 7956',
    address: 'Kosovke djevojke 14',
    blocked: false,
    picture: 'saint_cosme.jpg',
    changes: false,
  },
  
];

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private driverList: Driver[] = [];

  constructor() {
    for (let driverObj of DRIVERS) {
      const driver: Driver = {
        _id: driverObj._id,
        name: driverObj.name,
        email: driverObj.email,
        phone: driverObj.phone,
        address: driverObj.address,
        blocked: driverObj.blocked,
        picture: driverObj.picture,
        changes: driverObj.changes,
      };
      this.driverList.push(driver);
    }
  }

  getAll(): Driver[] {
    return this.driverList;
  }

  add(driver: any): void {
    this.driverList.push(driver);
  }
}