import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadMultipleSe } from './download-multiple-se';

describe('DownloadMultipleSe', () => {
  let component: DownloadMultipleSe;
  let fixture: ComponentFixture<DownloadMultipleSe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadMultipleSe],
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadMultipleSe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
