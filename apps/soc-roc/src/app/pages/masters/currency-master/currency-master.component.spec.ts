import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyMaster } from './currency-master.component';

describe('CurrencyMaster', () => {
  let component: CurrencyMaster;
  let fixture: ComponentFixture<CurrencyMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyMaster],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyMaster);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
