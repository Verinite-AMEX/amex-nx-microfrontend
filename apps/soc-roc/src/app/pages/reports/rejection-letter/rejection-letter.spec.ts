import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RejectionLetter } from './rejection-letter';

describe('RejectionLetter', () => {
  let component: RejectionLetter;
  let fixture: ComponentFixture<RejectionLetter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectionLetter]
    }).compileComponents();

    fixture = TestBed.createComponent(RejectionLetter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
