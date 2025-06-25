import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListproductbysubcatComponent } from './listproductbysubcat.component';

describe('ListproductbysubcatComponent', () => {
  let component: ListproductbysubcatComponent;
  let fixture: ComponentFixture<ListproductbysubcatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListproductbysubcatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListproductbysubcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
