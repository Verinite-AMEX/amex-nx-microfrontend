import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CentralStatement } from './central-statement';

describe('CentralStatement', () => {
  let component: CentralStatement;
  let fixture: ComponentFixture<CentralStatement>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentralStatement],
    }).compileComponents();
    fixture = TestBed.createComponent(CentralStatement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
