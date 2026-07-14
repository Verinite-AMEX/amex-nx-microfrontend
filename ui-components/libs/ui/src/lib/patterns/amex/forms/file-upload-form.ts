import { Component, Input, Output, EventEmitter, HostBinding, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../../composite/form-field';
import { FileInputComponent } from '../../../primitives/file-input';
import { ButtonComponent } from '../../../primitives/button';

/**
 * FileUploadForm
 * Generic file upload for BCRB CSV, SOC/ROC Excel, Centurion .txt.
 * ONLS style: label + file input + hint text + Submit button.
 * Source: BCRB, SOC/ROC Utilities, Centurion Living (image5)
 */
@Component({
  selector: 'amex-file-upload-form',
  standalone: true,
  imports: [CommonModule, FormsModule, FormFieldComponent, FileInputComponent, ButtonComponent],
  template: `
    <div class="fuf">
      <div class="fuf__title">{{ title }}</div>

      <ui-form-field class="fuf__field" [label]="fileLabel" [forId]="id + '-field'" [hint]="hintText">
        <div class="fuf__input-row">
          <ui-button
            variant="secondary"
            size="sm"
            label="Browse..."
            (click)="fileInput.click()">
          </ui-button>
          <span class="fuf__file-name">{{ selectedFile?.name || 'No file chosen' }}</span>
          <ui-file-input #fileInput
            [id]="id + '-field'"
            [accept]="acceptedTypes"
            [ariaLabel]="fileLabel"
            (filesSelected)="onFilesSelected($event)">
          </ui-file-input>
        </div>
      </ui-form-field>

      <!-- Error state — red text below (matches Centurion image5) -->
      <div *ngIf="errorMessage" class="fuf__error">{{ errorMessage }}</div>

      <div class="fuf__actions">
        <ui-button
          class="fuf__btn fuf__btn--submit"
          variant="primary"
          [disabled]="!selectedFile"
          [label]="submitLabel"
          (click)="submitClick.emit(selectedFile)">
        </ui-button>
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
    .fuf__input-row { display: flex; align-items: center; gap: 10px; }
    .fuf__file-name { font-size: 13px; color: #555; }
    .fuf__error { font-size: 12px; color: #c62828; margin-bottom: 10px; }
    .fuf__actions { margin-top: 10px; }
    .fuf__btn--submit {
      --btn-bg: linear-gradient(to bottom, #5ba3e0, #006fcf);
      --btn-color: #fff; --btn-border: 1px solid #005fba;
      --btn-radius: 2px; --btn-padding: 5px 24px; --btn-font-size: 13px;
    }
  `],
})
export class AmexFileUploadFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `file-upload-form-${++AmexFileUploadFormComponent._idCounter}`;

  @Input() title = 'Load Client Data';
  @Input() fileLabel = 'Choose File';
  @Input() hintText = '';
  @Input() submitLabel = 'Submit';
  @Input() acceptedTypes = '*';
  @Input() errorMessage = '';

  @ViewChild('fileInput') fileInput!: FileInputComponent;

  selectedFile: File | null = null;

  @Output() submitClick = new EventEmitter<File | null>();

  onFilesSelected(files: FileList) {
    this.selectedFile = files?.[0] ?? null;
  }
}