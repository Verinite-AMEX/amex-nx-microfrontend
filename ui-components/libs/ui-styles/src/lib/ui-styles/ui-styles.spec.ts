import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiStyles } from './ui-styles';

describe('UiStyles', () => {
  let component: UiStyles;
  let fixture: ComponentFixture<UiStyles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiStyles],
    }).compileComponents();

    fixture = TestBed.createComponent(UiStyles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
