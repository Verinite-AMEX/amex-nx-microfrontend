import { Component, Input, Output, EventEmitter, ViewChild, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileInputComponent } from '../atoms/file-input';
import { IconComponent } from '../atoms/icon';
import { IconButtonComponent } from '../atoms/icon-button';

@Component({
  selector: 'ui-file-upload',
  standalone: true,
  imports: [CommonModule, FileInputComponent, IconComponent, IconButtonComponent],
  template: `
    <div class="file-upload" role="button" tabindex="0" [attr.aria-disabled]="disabled" [class.dragover]="dragging" [class.disabled]="disabled"
      (dragover)="onDragOver($event)" (dragleave)="dragging=false" (drop)="onDrop($event)"
      (click)="openPicker()" (keydown)="onKeydown($event)">
      <ui-file-input #fileInput class="file-input-hidden"
        [accept]="accept" [multiple]="multiple" [disabled]="disabled"
        [ariaLabel]="'Upload files'"
        (filesSelected)="onFilesSelected($event)">
      </ui-file-input>
      <div class="file-upload-content">
        <ui-icon glyph="📁" size="lg" [decorative]="true" class="file-upload-icon"></ui-icon>
        <p class="file-upload-text">{{ dragging ? 'Drop files here' : 'Click or drag files to upload' }}</p>
        <p class="file-upload-hint" *ngIf="hint">{{ hint }}</p>
      </div>
      <ul *ngIf="files.length" class="file-list">
        <li *ngFor="let f of files; let i = index" class="file-item">
          <span>{{ f.name }}</span>
          <ui-icon-button icon="✕" size="sm" variant="ghost" ariaLabel="Remove {{f.name}}"
            [style.--icon-btn-size]="'22px'"
            [style.--icon-btn-bg]="'transparent'"
            [style.--icon-btn-color]="'#999'"
            (click)="$event.stopPropagation()"
            (clicked)="removeFile(i)">
          </ui-icon-button>
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
    .file-input-hidden { display: none; }
    .file-upload-icon { display: block; margin: 0 auto 8px; }
    .file-upload-text { margin: 0 0 4px; font-size: 14px; color: #555; }
    .file-upload-hint { margin: 0; font-size: 12px; color: #999; }
    .file-list { list-style: none; padding: 0; margin: 12px 0 0; text-align: left; display: flex; flex-direction: column; gap: 4px; }
    .file-item { display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; background: #f0f0f0; border-radius: 4px; font-size: 13px; color: #333; }
  `],
})
export class FileUploadComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-file-upload-${++FileUploadComponent._idCounter}`;

  @Input() accept = '*';
  @Input() multiple = false;
  @Input() disabled = false;
  @Input() hint = '';
  @Output() filesSelected = new EventEmitter<File[]>();

  @ViewChild('fileInput') private fileInput!: FileInputComponent;

  files: File[] = [];
  dragging = false;

  openPicker() {
    if (!this.disabled) this.fileInput.click();
  }

  onKeydown(e: KeyboardEvent) {
    if (this.disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.fileInput.click();
    }
  }

  onDragOver(e: DragEvent) { e.preventDefault(); if (!this.disabled) this.dragging = true; }

  onDrop(e: DragEvent) {
    e.preventDefault(); this.dragging = false;
    if (!this.disabled && e.dataTransfer?.files) this.addFiles(Array.from(e.dataTransfer.files));
  }

  onFilesSelected(fileList: FileList) {
    this.addFiles(Array.from(fileList));
  }

  addFiles(newFiles: File[]) {
    this.files = this.multiple ? [...this.files, ...newFiles] : newFiles;
    this.filesSelected.emit(this.files);
  }

  removeFile(i: number) {
    this.files.splice(i, 1);
    this.filesSelected.emit(this.files);
  }
}