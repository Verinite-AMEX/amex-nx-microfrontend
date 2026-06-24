import { TestBed } from '@angular/core/testing';

import { SocRoc } from './soc-roc';

describe('SocRoc', () => {
  let service: SocRoc;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocRoc);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
