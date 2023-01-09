import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UUNavbarComponent } from './uu-navbar.component';

describe('UUNavbarComponent', () => {
  let component: UUNavbarComponent;
  let fixture: ComponentFixture<UUNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UUNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UUNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});