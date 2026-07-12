import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * FileUploadForm
 * Generic file upload for BCRB CSV, SOC/ROC Excel, Centurion .txt.
 * ONLS style: label + file input + hint text + Submit button.
 * Source: BCRB, SOC/ROC Utilities, Centurion Living (image5)
 */
@Component({
  selector: 'amex-file-upload-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fuf">
      <div class="fuf__title">{{ title }}</div>

      <div class="fuf__field">
        <label class="fuf__label" [for]="id + '-field'">{{ fileLabel }}</label>
        <div class="fuf__input-row">
          <input [id]="id + '-field'" type="file" class="fuf__file-input"
            [accept]="acceptedTypes"
            (change)="onFileChange($event)" />
        </div>
        <div *ngIf="hintText" class="fuf__hint">{{ hintText }}</div>
      </div>

      <!-- Error state — red text below (matches Centurion image5) -->
      <div *ngIf="errorMessage" class="fuf__error">{{ errorMessage }}</div>

      <div class="fuf__actions">
        <button class="fuf__btn fuf__btn--submit"
          [disabled]="!selectedFile"
          (click)="submitClick.emit(selectedFile)">
          {{ submitLabel }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .fuf__title {
      font-size: 16px; font-weight: bold; color: #1a3a6b;
      margin-bottom: 14px;
    }
    .fuf__field { margin-bottom: 12px; }
    .fuf__label {
      display: block; font-size: 13px; color: #333;
      font-weight: bold; margin-bottom: 8px;
    }
    .fuf__input-row { display: flex; align-items: center; gap: 10px; }
    .fuf__file-input { font-size: 13px; }
    .fuf__hint { font-size: 12px; color: #c62828; margin-top: 4px; }
    .fuf__error { font-size: 12px; color: #c62828; margin-bottom: 10px; }
    .fuf__actions { margin-top: 10px; }
    .fuf__btn {
      padding: 5px 24px; font-size: 13px; cursor: pointer;
      border-radius: 2px; font-family: Arial, sans-serif;
    }
    .fuf__btn--submit {
      background: linear-gradient(to bottom, #5ba3e0, #006fcf);
      color: #fff; border: 1px solid #005fba;
    }
    .fuf__btn--submit:hover:not([disabled]) {
      background: linear-gradient(to bottom, #4a92cf, #0058a6);
    }
    .fuf__btn--submit[disabled] { opacity: 0.4; cursor: not-allowed; }
  `],
})
export class AmexFileUploadFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `file-upload-form-${++AmexFileUploadFormComponent._idCounter}`;


  @Input() title = 'Load Client Data';
  @Input() fileLabel = 'Choose File';
  @Input() hintText = '';
  @Input() submitLabel = 'Submit';
  @Input() acceptedTypes = '*';
  @Input() errorMessage = '';

  selectedFile: File | null = null;

  @Output() submitClick = new EventEmitter<File | null>();

  onFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }
}
