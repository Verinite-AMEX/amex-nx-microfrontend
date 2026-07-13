import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocRocTransactions } from './soc-roc-transactions';

describe('SocRocTransactions', () => {
  let component: SocRocTransactions;
  let fixture: ComponentFixture<SocRocTransactions>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocRocTransactions],
    }).compileComponents();
    fixture = TestBed.createComponent(SocRocTransactions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
