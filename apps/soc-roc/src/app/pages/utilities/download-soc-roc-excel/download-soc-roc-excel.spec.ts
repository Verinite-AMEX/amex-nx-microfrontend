import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadSocRocExcel } from './download-soc-roc-excel';

describe('DownloadSocRocExcel', () => {
  let component: DownloadSocRocExcel;
  let fixture: ComponentFixture<DownloadSocRocExcel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadSocRocExcel],
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadSocRocExcel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
