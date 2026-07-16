import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VatInvoiceReport } from './vat-invoice-report';

describe('VatInvoiceReport', () => {
  let component: VatInvoiceReport;
  let fixture: ComponentFixture<VatInvoiceReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VatInvoiceReport]
    }).compileComponents();

    fixture = TestBed.createComponent(VatInvoiceReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
