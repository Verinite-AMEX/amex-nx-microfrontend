import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsolidatedRejectionReport } from './consolidated-rejection-report';

describe('ConsolidatedRejectionReport', () => {
  let component: ConsolidatedRejectionReport;
  let fixture: ComponentFixture<ConsolidatedRejectionReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsolidatedRejectionReport]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsolidatedRejectionReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
