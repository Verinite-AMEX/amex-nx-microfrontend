// libs/ui/src/lib/atoms/file-input.ts
import { Component, Input, Output, EventEmitter, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-file-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <input #nativeInput
      type="file"
      [id]="id"
      [accept]="accept"
      [multiple]="multiple"
      [disabled]="disabled"
      [attr.aria-label]="ariaLabel || null"
      [attr.aria-describedby]="ariaDescribedBy || null"
      (change)="onChange($event)"
      class="file-input"
    />
  `,
  styles: [`
    .file-input { display: none; }
  `],
})
export class FileInputComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-file-input-${++FileInputComponent._idCounter}`;

  @Input() accept = '';
  @Input() multiple = false;
  @Input() disabled = false;
  @Input() ariaLabel = '';
  @Input() ariaDescribedBy = '';
  @Output() filesSelected = new EventEmitter<FileList>();

  @ViewChild('nativeInput', { static: true }) private nativeInput!: ElementRef<HTMLInputElement>;

  /** Public delegate — lets consumers (e.g. a dropzone wrapper) open the file picker
   *  without reaching into this component's DOM themselves. */
  click(): void {
    if (!this.disabled) this.nativeInput.nativeElement.click();
  }

  focus(): void {
    this.nativeInput.nativeElement.focus();
  }

  onChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.filesSelected.emit(files);
    }
  }
}