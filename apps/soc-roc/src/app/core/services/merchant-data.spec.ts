import { TestBed } from '@angular/core/testing';

import { MerchantData } from './merchant-data';

describe('MerchantData', () => {
  let service: MerchantData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchantData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
