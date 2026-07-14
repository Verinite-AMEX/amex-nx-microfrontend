import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaptureMultipleSe } from './capture-multiple-se';

describe('CaptureMultipleSe', () => {
  let component: CaptureMultipleSe;
  let fixture: ComponentFixture<CaptureMultipleSe>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptureMultipleSe],
    }).compileComponents();
    fixture = TestBed.createComponent(CaptureMultipleSe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
