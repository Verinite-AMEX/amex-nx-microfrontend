import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocControlReport } from './soc-control-report';

describe('SocControlReport', () => {
  let component: SocControlReport;
  let fixture: ComponentFixture<SocControlReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocControlReport],
    }).compileComponents();

    fixture = TestBed.createComponent(SocControlReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
