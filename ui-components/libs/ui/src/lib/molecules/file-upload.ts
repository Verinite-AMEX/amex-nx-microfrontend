import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="file-upload" role="button" tabindex="0" [attr.aria-disabled]="disabled" [class.dragover]="dragging" [class.disabled]="disabled"
      (dragover)="onDragOver($event)" (dragleave)="dragging=false" (drop)="onDrop($event)"
      (click)="!disabled && fileInput.click()" (keydown)="onKeydown($event, fileInput)">
      <input #fileInput type="file" class="file-input" [accept]="accept" [multiple]="multiple"
        (change)="onFileChange($event)" />
      <div class="file-upload-content">
        <span class="file-upload-icon">📁</span>
        <p class="file-upload-text">{{ dragging ? 'Drop files here' : 'Click or drag files to upload' }}</p>
        <p class="file-upload-hint" *ngIf="hint">{{ hint }}</p>
      </div>
      <ul *ngIf="files.length" class="file-list">
        <li *ngFor="let f of files; let i = index" class="file-item">
          <span>{{ f.name }}</span>
          <button class="file-remove" (click)="removeFile(i, $event)" aria-label="Remove">✕</button>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .file-upload {
      border: 2px dashed #e0e0e0; border-radius: 8px; padding: 24px;
      text-align: center; cursor: pointer; transition: all 0.2s;
      font-family: Arial, sans-serif; background: #fafafa;
    }
    .file-upload:hover:not(.disabled) { border-color: #1976d2; background: #f0f7ff; }
    .file-upload.dragover { border-color: #1976d2; background: #e3f2fd; }
    .file-upload.disabled { opacity: 0.5; cursor: not-allowed; }
    .file-input { display: none; }
    .file-upload-icon { font-size: 32px; display: block; margin-bottom: 8px; }
    .file-upload-text { margin: 0 0 4px; font-size: 14px; color: #555; }
    .file-upload-hint { margin: 0; font-size: 12px; color: #999; }
    .file-list { list-style: none; padding: 0; margin: 12px 0 0; text-align: left; display: flex; flex-direction: column; gap: 4px; }
    .file-item { display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; background: #f0f0f0; border-radius: 4px; font-size: 13px; color: #333; }
    .file-remove { background: none; border: none; cursor: pointer; color: #999; font-size: 12px; }
    .file-remove:hover { color: #f44336; }
  `],
})
export class FileUploadComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `ui-file-upload-${++FileUploadComponent._idCounter}`;


  @Input() accept = '*';
  @Input() multiple = false;
  @Input() disabled = false;
  @Input() hint = '';
  @Output() filesSelected = new EventEmitter<File[]>();

  files: File[] = [];
  dragging = false;

  onKeydown(e: KeyboardEvent, fileInput: HTMLInputElement) {
    if (this.disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInput.click();
    }
  }

  onDragOver(e: DragEvent) { e.preventDefault(); if (!this.disabled) this.dragging = true; }

  onDrop(e: DragEvent) {
    e.preventDefault(); this.dragging = false;
    if (!this.disabled && e.dataTransfer?.files) this.addFiles(Array.from(e.dataTransfer.files));
  }

  onFileChange(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (files) this.addFiles(Array.from(files));
  }

  addFiles(newFiles: File[]) {
    this.files = this.multiple ? [...this.files, ...newFiles] : newFiles;
    this.filesSelected.emit(this.files);
  }

  removeFile(i: number, e: MouseEvent) {
    e.stopPropagation();
    this.files.splice(i, 1);
    this.filesSelected.emit(this.files);
  }
}
