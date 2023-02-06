import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassengerCurrentComponent } from './passenger-current-component';

describe('PassengerCurrentComponent', () => {
  let component: PassengerCurrentComponent;
  let fixture: ComponentFixture<PassengerCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerCurrentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});