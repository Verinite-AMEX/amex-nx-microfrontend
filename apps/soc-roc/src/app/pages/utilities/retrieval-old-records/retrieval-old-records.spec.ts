import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetrievalOldRecords } from './retrieval-old-records';

describe('RetrievalOldRecords', () => {
  let component: RetrievalOldRecords;
  let fixture: ComponentFixture<RetrievalOldRecords>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetrievalOldRecords],
    }).compileComponents();
    fixture = TestBed.createComponent(RetrievalOldRecords);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
