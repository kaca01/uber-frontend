import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { allPassengers, login1, passenger1, update1 } from 'src/app/mocks/user.service.mock';

describe('UserService', () => {
  let service: UserService;
  let httpController: HttpTestingController;

  let url = 'http://localhost:8081'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call addPassenger and the API should return the passenger that was added', () => {
    service.addPassenger(passenger1).subscribe((data) => {
      expect(data).toEqual(passenger1);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}/api/passenger`
    });

    req.flush(passenger1);
  });

  it('should call updatePassenger and the API should return the passenger that was updated', () => {
    const id = 1;

    service.updatePassenger(id, update1).subscribe((data) => {
      expect(data).toEqual(passenger1);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${url}/api/passenger/${id}`
    });

    req.flush(passenger1);
  });

  it('should call getAllPassengers and return an array of passengers', () => {
    service.getAllPassengers().subscribe((res) => {
      expect(res).toEqual(allPassengers);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/api/passenger`,
    });

    req.flush(allPassengers);
  });

  it('should call login and the API should return current login user', () => {
    service.login(login1).subscribe((data) => {
      expect(data).toEqual(login1);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}/api/user/login`
    });

    console.log(url)
    req.flush(login1);
  });
});
