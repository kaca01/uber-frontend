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

  it('form should be valid', () => {
    component.registrationForm.controls['name'].setValue('Nina');
    component.registrationForm.controls['surname'].setValue('Milic');
    component.registrationForm.controls['address'].setValue('Vojvode Stepe 23');
    component.registrationForm.controls['email'].setValue('nina@gmail.com');
    component.registrationForm.controls['password'].setValue('123');
    component.registrationForm.controls['repeatPassword'].setValue('123');
    component.registrationForm.controls['telephoneNumber'].setValue('067332541');
    expect(component.registrationForm.valid).toBeTruthy();
  });


  it('form should not be valid - empty fields', () => {
    component.registrationForm.controls['name'].setValue('');
    component.registrationForm.controls['surname'].setValue('');
    component.registrationForm.controls['address'].setValue('');
    component.registrationForm.controls['email'].setValue('');
    component.registrationForm.controls['password'].setValue('');
    component.registrationForm.controls['repeatPassword'].setValue('');
    component.registrationForm.controls['telephoneNumber'].setValue('');
    expect(component.registrationForm.valid).toBeFalsy();
  });

  it('form should not be valid - incorrect email format', () => {
    component.registrationForm.controls['email'].setValue('ana');
    component.registrationForm.controls['name'].setValue('Nina');
    component.registrationForm.controls['surname'].setValue('Milic');
    component.registrationForm.controls['address'].setValue('Vojvode Stepe 23');
    component.registrationForm.controls['password'].setValue('123');
    component.registrationForm.controls['repeatPassword'].setValue('123');
    component.registrationForm.controls['telephoneNumber'].setValue('067332541');
    expect(component.registrationForm.valid).toBeFalsy();
  });

  it('form should not be valid - incorrect telephone number format', () => {
    component.registrationForm.controls['name'].setValue('Nina');
    component.registrationForm.controls['surname'].setValue('Milic');
    component.registrationForm.controls['address'].setValue('Vojvode Stepe 23');
    component.registrationForm.controls['email'].setValue('nina@gmail.com');
    component.registrationForm.controls['password'].setValue('123');
    component.registrationForm.controls['repeatPassword'].setValue('123');
    component.registrationForm.controls['telephoneNumber'].setValue('neka_slova');
    expect(component.registrationForm.valid).toBeFalsy();
  });

  it('form should not be valid - incorrect name format', () => {
    component.registrationForm.controls['name'].setValue('Nina888');
    component.registrationForm.controls['surname'].setValue('Milic');
    component.registrationForm.controls['address'].setValue('Vojvode Stepe 23');
    component.registrationForm.controls['email'].setValue('nina@gmail.com');
    component.registrationForm.controls['password'].setValue('123');
    component.registrationForm.controls['repeatPassword'].setValue('123');
    component.registrationForm.controls['telephoneNumber'].setValue('067332541');
    expect(component.registrationForm.valid).toBeFalsy();
  });

  it('form should not be valid - incorrect surname format', () => {
    component.registrationForm.controls['name'].setValue('Nina');
    component.registrationForm.controls['surname'].setValue('Milic888');
    component.registrationForm.controls['address'].setValue('Vojvode Stepe 23');
    component.registrationForm.controls['email'].setValue('nina@gmail.com');
    component.registrationForm.controls['password'].setValue('123');
    component.registrationForm.controls['repeatPassword'].setValue('123');
    component.registrationForm.controls['telephoneNumber'].setValue('067332541');
    expect(component.registrationForm.valid).toBeFalsy();
  });

  it('form should not be valid - name does not have enough characters', () => {
    component.registrationForm.controls['name'].setValue('N');
    component.registrationForm.controls['surname'].setValue('Milic');
    component.registrationForm.controls['address'].setValue('Vojvode Stepe 23');
    component.registrationForm.controls['email'].setValue('nina@gmail.com');
    component.registrationForm.controls['password'].setValue('123');
    component.registrationForm.controls['repeatPassword'].setValue('123');
    component.registrationForm.controls['telephoneNumber'].setValue('067332541');
    expect(component.registrationForm.valid).toBeFalsy();
  });

  it('form should not be valid - surname does not have enough characters', () => {
    component.registrationForm.controls['name'].setValue('Nina');
    component.registrationForm.controls['surname'].setValue('M');
    component.registrationForm.controls['address'].setValue('Vojvode Stepe 23');
    component.registrationForm.controls['email'].setValue('nina@gmail.com');
    component.registrationForm.controls['password'].setValue('123');
    component.registrationForm.controls['repeatPassword'].setValue('123');
    component.registrationForm.controls['telephoneNumber'].setValue('067332541');
    expect(component.registrationForm.valid).toBeFalsy();
  });
});
