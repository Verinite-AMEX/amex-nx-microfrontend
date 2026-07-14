import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { NgIf } from '@angular/common';
import { LabelComponent } from './label';

@Component({
  selector: 'ui-radio',
  standalone: true,
  imports: [LabelComponent, NgIf],
  template: `
    <ui-label [disabled]="disabled">
      <input
        type="radio"
        [id]="id"
        [name]="name"
        [value]="value"
        [checked]="checked"
        [disabled]="disabled"
        [required]="required"
        [attr.aria-label]="ariaLabel || null"
        [attr.aria-describedby]="ariaDescribedBy || null"
        [attr.aria-invalid]="ariaInvalid ? 'true' : null"
        [attr.aria-required]="required"
        (change)="onChange($event)"
        class="ui-radio-input"
      />
      <span class="ui-radio-circle" aria-hidden="true"></span>
      <span *ngIf="label" class="ui-radio-text">{{ label }}</span>
    </ui-label>
  `,
  styles: [`
    .ui-radio-input { display: none; }
    .ui-radio-circle {
      width: 18px; height: 18px; border: 2px solid #e0e0e0; border-radius: 50%;
      background: #fff; display: inline-flex; align-items: center; justify-content: center;
      transition: all 0.2s; flex-shrink: 0; margin-right: 6px;
    }
    .ui-radio-input:checked + .ui-radio-circle { border-color: #1976d2; }
    .ui-radio-input:checked + .ui-radio-circle::after {
      content: ''; width: 8px; height: 8px; border-radius: 50%; background: #1976d2; display: block;
    }
    .ui-radio-input:disabled + .ui-radio-circle { opacity: 0.5; }
  `],
})
export class RadioComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-radio-${++RadioComponent._idCounter}`;
  @Input() name = 'radio';
  @Input() value: string | number = '';
  @Input() checked = false;
  @Input() disabled = false;
  @Input() required = false;
  @Input() label = '';
  @Input() ariaLabel = '';
  @Input() ariaDescribedBy = '';
  @Input() ariaInvalid = false;
  @Output() checkedChange = new EventEmitter<string | number>();

  onChange(event: Event) {
    if ((event.target as HTMLInputElement).checked) {
      this.checkedChange.emit(this.value);
    }
  }
}