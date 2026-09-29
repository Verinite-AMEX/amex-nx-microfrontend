import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../form-field';
import { InputComponent } from '../../../primitives/input';
import { ButtonComponent } from '../../../primitives/button';

/**
 * Unlike ui-search-bar (composite/search-bar.ts), this component is a
 * plain labeled field + Submit/Clear button row — it never relied on
 * DLS's `.search > input`/`.search > button` direct-child selectors, so
 * <ui-form-field>/<ui-input>/<ui-button> can be reused safely here; there's
 * no DOM-adjacency requirement being violated.
 *
 * All hand-rolled `--input-*`/`--btn-*` CSS custom properties are removed:
 * they were always dead code — neither InputComponent nor ButtonComponent
 * (both already upgraded to real DLS classes) read any CSS variables, so
 * these never did anything even before this pass. Real DLS styling now
 * comes automatically from <ui-input>'s .formControl and <ui-button>'s
 * .btnPrimary/.btnTertiary.
 *
 * Error text now uses DLS's real .alertForm class (forms.css) instead of
 * hardcoded red (#c00) + Arial. The input is also marked `invalid` when
 * there's an error, so it picks up the real .formControlWarning border/
 * icon from InputComponent automatically — the two were previously
 * unlinked (the input never visually reacted to errorMessage at all).
 */
@Component({
  selector: 'amex-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FormFieldComponent,
    InputComponent,
    ButtonComponent,
  ],
  template: `
    <div class="search-wrap">
      <div class="search-row">
        <ui-form-field
          class="search-field"
          [label]="label"
          [forId]="id + '-field'"
        >
          <ui-input
            [id]="id + '-field'"
            type="text"
            [placeholder]="placeholder"
            [ariaLabel]="label"
            [invalid]="!!errorMessage"
            [ariaDescribedBy]="errorMessage ? id + '-error' : ''"
            [(ngModel)]="value"
            (ngModelChange)="onModelChange($event)"
            (keyup.enter)="onSubmit()"
          >
          </ui-input>
        </ui-form-field>
        <ui-button
          class="search-btn"
          variant="primary"
          size="sm"
          [label]="buttonLabel"
          [disabled]="!value.trim()"
          (click)="onSubmit()"
        >
        </ui-button>
        <ui-button
          *ngIf="value"
          class="search-clear"
          variant="tertiary"
          size="sm"
          label="Clear"
          (click)="onClear()"
        >
        </ui-button>
      </div>
      <div
        *ngIf="errorMessage"
        class="alertForm"
        [id]="id + '-error'"
        role="alert"
      >
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [
    `
      /* Layout-only glue — no DLS equivalent needed for this row/wrap
         spacing; not part of any component's visual identity. */
      .search-wrap {
        padding: 10px 0;
      }
      .search-row {
        display: flex;
        align-items: flex-end;
        gap: 6px;
        flex-wrap: wrap;
      }
      .search-field {
        width: 220px;
      }
    `,
  ],
})
export class AmexSearchBarComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `search-bar-${++AmexSearchBarComponent._idCounter}`;

  @Input() label = 'Search';
  @Input() placeholder = '';
  @Input() buttonLabel = 'Submit';
  @Input() errorMessage = '';

  @Output() search = new EventEmitter<string>();
  @Output() cleared = new EventEmitter<void>();

  value = '';

  onModelChange(v: string) {
    this.value = v;
  }

  onSubmit() {
    if (this.value.trim()) {
      this.search.emit(this.value.trim());
    }
  }

  onClear() {
    this.value = '';
    this.cleared.emit();
  }
} 