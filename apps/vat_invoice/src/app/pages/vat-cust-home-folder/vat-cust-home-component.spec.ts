import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VatCustHomeComponent } from './vat-cust-home-component';

describe('VatCustHomeComponent', () => {
  let component: VatCustHomeComponent;
  let fixture: ComponentFixture<VatCustHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VatCustHomeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VatCustHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
