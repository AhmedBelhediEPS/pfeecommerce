import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailcartComponent } from './detailcart.component';

describe('DetailcartComponent', () => {
  let component: DetailcartComponent;
  let fixture: ComponentFixture<DetailcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailcartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
