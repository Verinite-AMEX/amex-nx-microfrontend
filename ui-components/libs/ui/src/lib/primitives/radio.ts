// libs/ui/src/lib/primitives/radio.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';

@Component({
  selector: 'ui-radio',
  standalone: true,
  template: `
    <div class="radio">
      <input
        type="radio"
        [id]="id"
        [name]="name"
        [value]="value"
        [checked]="checked"
        [disabled]="disabled"
        [required]="required"
        [attr.aria-invalid]="invalid ? 'true' : 'false'"
        [attr.aria-label]="ariaLabel || null"
        [attr.aria-describedby]="ariaDescribedBy || null"
        (change)="onChange($event)"
      />
      <label [attr.for]="id">{{ label }}</label>
    </div>
  `,
})
export class RadioComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-radio-${++RadioComponent._idCounter}`;
  @Input() name = 'radio';
  @Input() value: string | number = '';
  @Input() checked = false;
  @Input() disabled = false;
  @Input() required = false;
  @Input() label = '';
  @Input() invalid = false;
  @Input() ariaLabel = '';
  @Input() ariaDescribedBy = '';
  @Output() checkedChange = new EventEmitter<string | number>();

  onChange(event: Event): void {
    if ((event.target as HTMLInputElement).checked) {
      this.checkedChange.emit(this.value);
    }
  }
}