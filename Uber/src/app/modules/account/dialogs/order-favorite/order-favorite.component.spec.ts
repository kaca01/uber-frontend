import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFavoriteComponent } from './order-favorite.component';

describe('OrderFavoriteComponent', () => {
  let component: OrderFavoriteComponent;
  let fixture: ComponentFixture<OrderFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderFavoriteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
