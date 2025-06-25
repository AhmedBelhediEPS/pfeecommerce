import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsubcategoryComponent } from './listsubcategory.component';

describe('ListsubcategoryComponent', () => {
  let component: ListsubcategoryComponent;
  let fixture: ComponentFixture<ListsubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsubcategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListsubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
