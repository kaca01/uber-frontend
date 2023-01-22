import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverChangesComponent } from './driver-changes.component';

describe('DriverChangesComponent', () => {
  let component: DriverChangesComponent;
  let fixture: ComponentFixture<DriverChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverChangesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
