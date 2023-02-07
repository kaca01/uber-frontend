import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture.detectChanges();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the submit method', () => {
    spyOn(component, 'login');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.login).toHaveBeenCalledTimes(0);
  });

  it('form should not be valid', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('form should be valid', () => {
    component.loginForm.controls['email'].setValue('ana@gmail.com');
    component.loginForm.controls['password'].setValue('123');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('form should not be valid', () => {
    component.loginForm.controls['email'].setValue('ana');
    component.loginForm.controls['password'].setValue('123');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('form should not be valid', () => {
    component.loginForm.controls['email'].setValue('ana@gmail.com');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('form should not be valid', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('123');
    expect(component.loginForm.valid).toBeFalsy();
  });
});
