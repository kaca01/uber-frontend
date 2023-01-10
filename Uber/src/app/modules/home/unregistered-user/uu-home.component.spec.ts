import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UuHomeComponent } from './uu-home.component';

describe('UuHomeComponent', () => {
  let component: UuHomeComponent;
  let fixture: ComponentFixture<UuHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UuHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UuHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
