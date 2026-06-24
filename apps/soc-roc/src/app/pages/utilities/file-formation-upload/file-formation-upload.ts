import { Component, OnInit } from '@angular/core';
import {
  AmexFileUploadFormComponent,
  AmexFileUploadProgressComponent,
  AmexSuccessToastComponent,
  AmexErrorToastComponent
} from '@vn-core-ui-components/ui';
import { Utility } from '../../../core/services/utility';

@Component({
  selector: 'app-file-formation-upload',
  standalone: true,
  imports: [
    AmexFileUploadFormComponent,
    AmexFileUploadProgressComponent,
    AmexSuccessToastComponent,
    AmexErrorToastComponent
  ],
  template: `
    <amex-file-upload-form
      title="File Formation & Upload"
      fileLabel="Choose SOC/ROC File"
      submitLabel="Do File Formation"
      acceptedTypes=".txt,.csv,.dat"
      [errorMessage]="errorMessage"
      (submitClick)="onDoFileFormation($event)">
    </amex-file-upload-form>

    @if (isLoading) {
      <amex-file-upload-progress
        [fileName]="uploadFileName"
        [percent]="uploadPercent"
        status="uploading"
        portalStyle="onls"
        (cancel)="onCancelUpload()">
      </amex-file-upload-progress>
    }

    @if (uploadStatus === 'success') {
      <amex-success-toast
        [message]="statusMessage"
        portalStyle="onls"
        [autoDismiss]="true"
        (dismissed)="uploadStatus = 'idle'">
      </amex-success-toast>
    }

    @if (uploadStatus === 'error') {
      <amex-error-toast
        [message]="statusMessage"
        portalStyle="onls"
        (dismissed)="uploadStatus = 'idle'">
      </amex-error-toast>
    }
  `
})
export class FileFormationUpload implements OnInit {
  errorMessage: string = '';
  uploadFileName: string = '';
  uploadPercent: number = 0;
  isLoading: boolean = false;
  uploadStatus: 'idle' | 'success' | 'error' = 'idle';
  statusMessage: string = '';

  constructor(private utilityService: Utility) {}

  ngOnInit(): void {}

  onDoFileFormation(file: File | null): void {
    if (!file) {
      this.errorMessage = 'Please select a file.';
      return;
    }
    this.errorMessage = '';
    this.uploadFileName = file.name;
    this.isLoading = true;
    this.uploadPercent = 0;

    const today = new Date();
    const julianDay = this.getJulianDay(today);
    const dateStr = today.toISOString().split('T')[0];

    this.utilityService.formFile(dateStr, julianDay).subscribe({
      next: () => {
        this.isLoading = false;
        this.uploadPercent = 100;
        this.uploadStatus = 'success';
        this.statusMessage = 'File formation completed successfully.';
      },
      error: () => {
        this.isLoading = false;
        this.uploadStatus = 'error';
        this.statusMessage = 'File formation failed. Please try again.';
      }
    });
  }

  onCancelUpload(): void {
    this.isLoading = false;
    this.uploadStatus = 'idle';
  }

  private getJulianDay(date: Date): string {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24)).toString();
  }
}