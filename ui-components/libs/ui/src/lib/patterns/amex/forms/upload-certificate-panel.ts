import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanelComponent } from '../../../composite/panel';
import { FormFieldComponent } from '../../../composite/form-field';
import { FileInputComponent } from '../../../primitives/file-input';
import { ButtonComponent } from '../../../primitives/button';

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

/**
 * UploadCertificatePanel
 * OMS: File input for VAT certificate. Shows upload status.
 * Source: OMS — OMS style, navy Back + purple Upload
 */
@Component({
  selector: 'amex-upload-certificate-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, PanelComponent, FormFieldComponent, FileInputComponent, ButtonComponent],
  template: `
    <ui-panel [title]="title" variant="accent">
      <div class="ucp__step-info" *ngIf="stepInfo">{{ stepInfo }}</div>

      <ui-form-field class="ucp__field" [label]="fileLabel" [forId]="id + '-field'">
        <ui-file-input
          [id]="id + '-field'"
          [accept]="acceptedTypes"
          [ariaLabel]="fileLabel"
          (filesSelected)="onFilesSelected($event)">
        </ui-file-input>
        <div *ngIf="hintText" class="ucp__hint">{{ hintText }}</div>
      </ui-form-field>

      <div *ngIf="status !== 'idle'" class="ucp__status"
        [class.ucp__status--success]="status === 'success'"
        [class.ucp__status--error]="status === 'error'"
        [class.ucp__status--uploading]="status === 'uploading'">
        <span *ngIf="status === 'uploading'">Uploading...</span>
        <span *ngIf="status === 'success'">✓ {{ statusMessage }}</span>
        <span *ngIf="status === 'error'">✕ {{ statusMessage }}</span>
      </div>

      <div class="ucp__actions">
        <ui-button class="ucp__btn ucp__btn--back" variant="primary" label="Back" (click)="backClick.emit()"></ui-button>
        <ui-button class="ucp__btn ucp__btn--upload" variant="primary" [label]="uploadLabel"
          [disabled]="!selectedFile" (click)="uploadClick.emit(selectedFile)"></ui-button>
      </div>
    </ui-panel>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --panel-title-size: 15px;
      --panel-max-width: 560px;
      --panel-padding: 18px 22px;
    }
    .ucp__step-info { font-size: 13px; color: #555; margin-bottom: 14px; }
    .ucp__field { margin-bottom: 16px; }
    .ucp__hint { font-size: 12px; color: #c62828; margin-top: 4px; }
    .ucp__status { padding: 8px 12px; border-radius: 3px; font-size: 13px; margin-bottom: 12px; }
    .ucp__status--success { background: #e8f5e9; color: #2e7d32; border: 1px solid #c3e6cb; }
    .ucp__status--error { background: #ffebee; color: #c62828; border: 1px solid #f5c6c6; }
    .ucp__status--uploading { background: #e3f2fd; color: #1565c0; border: 1px solid #b8d4f0; }
    .ucp__actions { display: flex; gap: 10px; margin-top: 16px; }
    .ucp__btn--back { --btn-bg: #1e3a5f; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 8px 24px; --btn-font-size: 13px; }
    .ucp__btn--upload { --btn-bg: #7b1fa2; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 8px 24px; --btn-font-size: 13px; }
  `],
})
export class AmexUploadCertificatePanelComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `upload-certificate-panel-${++AmexUploadCertificatePanelComponent._idCounter}`;

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

  onFilesSelected(files: FileList) {
    this.selectedFile = files?.[0] ?? null;
  }
}