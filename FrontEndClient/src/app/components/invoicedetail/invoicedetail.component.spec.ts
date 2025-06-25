import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicedetailComponent } from './invoicedetail.component';

describe('InvoicedetailComponent', () => {
  let component: InvoicedetailComponent;
  let fixture: ComponentFixture<InvoicedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicedetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
