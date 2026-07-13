import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

/**
 * UploadCertificatePanel
 * OMS: File input for VAT certificate. Shows upload status.
 * Source: OMS — OMS style, navy Back + purple Upload
 */
@Component({
  selector: 'amex-upload-certificate-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="ucp">
      <div class="ucp__title">{{ title }}</div>
      <div class="ucp__accent"></div>
      <div class="ucp__panel">
        <div class="ucp__step-info" *ngIf="stepInfo">{{ stepInfo }}</div>
        <div class="ucp__field">
          <label class="ucp__label" [for]="id + '-field'">{{ fileLabel }}</label>
          <div class="ucp__file-row">
            <input [id]="id + '-field'" type="file" class="ucp__file-input" (change)="onFileChange($event)"
              [accept]="acceptedTypes" />
          </div>
          <div *ngIf="hintText" class="ucp__hint">{{ hintText }}</div>
        </div>
        <div *ngIf="status !== 'idle'" class="ucp__status"
          [class.ucp__status--success]="status === 'success'"
          [class.ucp__status--error]="status === 'error'"
          [class.ucp__status--uploading]="status === 'uploading'">
          <span *ngIf="status === 'uploading'">Uploading...</span>
          <span *ngIf="status === 'success'">✓ {{ statusMessage }}</span>
          <span *ngIf="status === 'error'">✕ {{ statusMessage }}</span>
        </div>
        <div class="ucp__actions">
          <button class="ucp__btn ucp__btn--back" (click)="backClick.emit()">Back</button>
          <button class="ucp__btn ucp__btn--upload" (click)="uploadClick.emit(selectedFile)"
            [disabled]="!selectedFile">{{ uploadLabel }}</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .ucp__title { font-size: 15px; font-weight: bold; color: #1a3a6b; padding: 0 0 6px; }
    .ucp__accent { height: 3px; background: #7b1fa2; margin-bottom: 14px; }
    .ucp__panel { background: #fff; border: 1px solid #e0e0e0; border-radius: 3px; padding: 18px 22px; max-width: 560px; }
    .ucp__step-info { font-size: 13px; color: #555; margin-bottom: 14px; }
    .ucp__field { margin-bottom: 16px; }
    .ucp__label { display: block; font-size: 13px; color: #1a3a6b; font-weight: bold; margin-bottom: 8px; }
    .ucp__file-input { font-size: 13px; }
    .ucp__hint { font-size: 12px; color: #c62828; margin-top: 4px; }
    .ucp__status { padding: 8px 12px; border-radius: 3px; font-size: 13px; margin-bottom: 12px; }
    .ucp__status--success { background: #e8f5e9; color: #2e7d32; border: 1px solid #c3e6cb; }
    .ucp__status--error { background: #ffebee; color: #c62828; border: 1px solid #f5c6c6; }
    .ucp__status--uploading { background: #e3f2fd; color: #1565c0; border: 1px solid #b8d4f0; }
    .ucp__actions { display: flex; gap: 10px; margin-top: 16px; }
    .ucp__btn { padding: 8px 24px; font-size: 13px; font-weight: bold; border: none; border-radius: 3px; cursor: pointer; font-family: Arial, sans-serif; }
    .ucp__btn--back   { background: #1e3a5f; color: #fff; }
    .ucp__btn--back:hover { background: #16304f; }
    .ucp__btn--upload { background: #7b1fa2; color: #fff; }
    .ucp__btn--upload:hover { background: #6a1b9a; }
    .ucp__btn--upload[disabled] { opacity: 0.4; cursor: not-allowed; }
  `],
})
export class AmexUploadCertificatePanelComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `upload-certificate-panel-${++AmexUploadCertificatePanelComponent._idCounter}`;


  @Input() title = 'Upload Certificate';
  @Input() stepInfo = 'Step 1 - Upload your VAT registration certificate';
  @Input() fileLabel = 'VAT Certificate File';
  @Input() hintText = 'Please upload only .pdf or .jpg files';
  @Input() uploadLabel = 'Upload';
  @Input() acceptedTypes = '.pdf,.jpg,.jpeg,.png';
  @Input() status: UploadStatus = 'idle';
  @Input() statusMessage = '';

  selectedFile: File | null = null;

  @Output() uploadClick = new EventEmitter<File | null>();
  @Output() backClick   = new EventEmitter<void>();

  onFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }
}
