import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsByCurrency } from './details-by-currency';

describe('DetailsByCurrency', () => {
  let component: DetailsByCurrency;
  let fixture: ComponentFixture<DetailsByCurrency>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsByCurrency],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsByCurrency);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
