import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RejectionLetterDetails } from './rejection-letter-details';

describe('RejectionLetterDetails', () => {
  let component: RejectionLetterDetails;
  let fixture: ComponentFixture<RejectionLetterDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectionLetterDetails]
    }).compileComponents();

    fixture = TestBed.createComponent(RejectionLetterDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
