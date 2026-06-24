import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MerchantData } from './merchant-data';

describe('MerchantData', () => {
  let component: MerchantData;
  let fixture: ComponentFixture<MerchantData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantData]
    }).compileComponents();

    fixture = TestBed.createComponent(MerchantData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
