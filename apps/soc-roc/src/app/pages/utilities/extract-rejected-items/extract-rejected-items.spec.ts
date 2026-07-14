import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExtractRejectedItems } from './extract-rejected-items';

describe('ExtractRejectedItems', () => {
  let component: ExtractRejectedItems;
  let fixture: ComponentFixture<ExtractRejectedItems>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtractRejectedItems],
    }).compileComponents();
    fixture = TestBed.createComponent(ExtractRejectedItems);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
