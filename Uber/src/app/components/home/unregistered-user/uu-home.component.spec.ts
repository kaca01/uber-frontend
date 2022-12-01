import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UUHomeComponent } from './uu-home.component';

describe('UUHomeComponent', () => {
  let component: UUHomeComponent;
  let fixture: ComponentFixture<UUHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UUHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UUHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});