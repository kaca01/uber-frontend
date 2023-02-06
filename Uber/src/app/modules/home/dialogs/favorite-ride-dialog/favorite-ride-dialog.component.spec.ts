import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteRideDialogComponent } from './favorite-ride-dialog.component';

describe('FavoriteRideDialogComponent', () => {
  let component: FavoriteRideDialogComponent;
  let fixture: ComponentFixture<FavoriteRideDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteRideDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteRideDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
