import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Retrieval } from './retrieval';

describe('Retrieval', () => {
  let component: Retrieval;
  let fixture: ComponentFixture<Retrieval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Retrieval]
    }).compileComponents();

    fixture = TestBed.createComponent(Retrieval);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
