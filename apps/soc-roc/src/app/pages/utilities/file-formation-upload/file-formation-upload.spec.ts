import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileFormationUpload } from './file-formation-upload';

describe('FileFormationUpload', () => {
  let component: FileFormationUpload;
  let fixture: ComponentFixture<FileFormationUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileFormationUpload],
    }).compileComponents();

    fixture = TestBed.createComponent(FileFormationUpload);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
