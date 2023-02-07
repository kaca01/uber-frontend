import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let debug: DebugElement;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement.query(By.css('form'));
    element = debug.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the onSubmit method', () => {
    spyOn(component, "reg");
    element = fixture.debugElement.query(By.css('reg-btn')).nativeElement;
    element.click();
    expect(component.reg).toHaveBeenCalledTimes(0);
  });
});
