import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RUNavbarComponent } from './ru-navbar.component';

describe('RUNavbarComponent', () => {
  let component: RUNavbarComponent;
  let fixture: ComponentFixture<RUNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RUNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RUNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});