import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlgeriaPayment } from './algeria-payment';

describe('AlgeriaPayment', () => {
  let component: AlgeriaPayment;
  let fixture: ComponentFixture<AlgeriaPayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgeriaPayment]
    }).compileComponents();

    fixture = TestBed.createComponent(AlgeriaPayment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
