import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangesDialogComponent } from './changes-dialog.component';

describe('ChangesDialogComponent', () => {
  let component: ChangesDialogComponent;
  let fixture: ComponentFixture<ChangesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
