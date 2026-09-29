import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * STRUCTURAL CHANGE — WORTH REVIEWING: the old version was a ghost button
 * ("Choose file") + inline filename text. DLS has no such pattern anywhere
 * in its CSS. What DLS actually defines (fileUpload.css) is a dashed-border
 * dropzone box (.fileUpload), with a .focus modifier for a highlighted
 * drag-over/focus state. This version switches to that real DLS pattern.
 *
 * TWO REAL GAPS IN DLS ITSELF, not something introduced here:
 *  1. .fileUpload is wrapped in `@media (min-width: 768px)` in DLS's own
 *     source CSS — it has literally no defined style below that width. On
 *     narrow viewports this will render as an unstyled box (border/padding
 *     default to nothing). This is a genuine DLS limitation, not a bug in
 *     this component.
 *  2. DLS ships zero JS for drag-and-drop (checked dls.js — no dragover/
 *     drop handlers exist anywhere). The .focus visual state exists in
 *     CSS, but DLS expects the consuming app to wire up the drag events
 *     itself. Basic dragenter/dragleave/drop handling is added below so
 *     the dropzone is actually usable, not just decorative.
 */
@Component({
  selector: 'ui-file-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fileUpload"
      [class.focus]="dragActive"
      (click)="click()"
      (dragenter)="onDragEnter($event)"
      (dragover)="onDragEnter($event)"
      (dragleave)="onDragLeave($event)"
      (drop)="onDrop($event)"
    >
      <p>
        {{ fileNames || (multiple ? 'Choose files' : 'Choose a file') }}
        <br />
        <span>or drag and drop here</span>
      </p>

      <input
        #nativeInput
        type="file"
        [id]="id"
        [accept]="accept"
        [multiple]="multiple"
        [disabled]="disabled"
        [attr.aria-label]="ariaLabel || null"
        [attr.aria-describedby]="ariaDescribedBy || null"
        (change)="onChange($event)"
        (focus)="dragActive = true"
        (blur)="dragActive = false"
        style="position: absolute; width: 1px; height: 1px; opacity: 0; overflow: hidden;"
      />
    </div>
  `,
})
export class FileInputComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-file-input-${++FileInputComponent._idCounter}`;

  @Input() accept = '';
  @Input() multiple = false;
  @Input() disabled = false;
  @Input() ariaLabel = '';
  @Input() ariaDescribedBy = '';
  @Output() filesSelected = new EventEmitter<FileList>();

  @ViewChild('nativeInput', { static: true })
  private nativeInput!: ElementRef<HTMLInputElement>;

  fileNames = '';
  dragActive = false;

  click(): void {
    if (!this.disabled) this.nativeInput.nativeElement.click();
  }

  focus(): void {
    this.nativeInput.nativeElement.focus();
  }

  onChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    this.setFiles(files);
  }

  onDragEnter(event: DragEvent) {
    event.preventDefault();
    if (!this.disabled) this.dragActive = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragActive = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragActive = false;
    if (this.disabled) return;
    const files = event.dataTransfer?.files ?? null;
    if (files && files.length) {
      this.nativeInput.nativeElement.files = files;
      this.setFiles(files);
    }
  }

  private setFiles(files: FileList | null) {
    if (files && files.length) {
      this.fileNames = Array.from(files)
        .map((f) => f.name)
        .join(', ');
      this.filesSelected.emit(files);
    }
  }
}