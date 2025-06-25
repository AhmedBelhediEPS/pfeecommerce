import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListproviderComponent } from './listprovider.component';

describe('ListproviderComponent', () => {
  let component: ListproviderComponent;
  let fixture: ComponentFixture<ListproviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListproviderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListproviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
