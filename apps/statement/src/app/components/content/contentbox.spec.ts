import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contentbox } from './contentbox';

describe('Contentbox', () => {
  let component: Contentbox;
  let fixture: ComponentFixture<Contentbox>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contentbox],
    }).compileComponents();
    fixture = TestBed.createComponent(Contentbox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
