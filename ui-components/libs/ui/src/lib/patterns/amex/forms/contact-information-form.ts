import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanelComponent } from '../../../composite/panel';
import { InputComponent } from '../../../primitives/input';
import { SelectComponent, SelectOption } from '../../../primitives/select';
import { ButtonComponent } from '../../../primitives/button';

export interface ContactRow {
  name: string;
  jobTitle: string;
  email: string;
  countryCode: string;
  landline: string;
  mobile: string;
}

/**
 * ContactInformationForm
 * OMS: multiple contact rows (Name, Job Title, Email, Country dropdown, Landline, Mobile).
 * "Operations" section header with purple accent.
 * Back (navy) + Save (purple) buttons.
 * Source: OMS (image20, image60) — exact layout match
 */
@Component({
  selector: 'amex-contact-information-form',
  standalone: true,
  imports: [CommonModule, FormsModule, PanelComponent, InputComponent, SelectComponent, ButtonComponent],
  template: `
    <ui-panel [title]="sectionTitle">
      <!-- Contact rows — each has Name, Job Title, then Email/Country/Landline/Mobile -->
      <div *ngFor="let contact of contacts; let i = index" class="cif__contact-row">
        <ui-input class="cif__input cif__input--full"
          [id]="id + '-contact-' + i + '-name'"
          [(ngModel)]="contact.name"
          ariaLabel="Name"
          placeholder="Name">
        </ui-input>
        <ui-input class="cif__input cif__input--full" style="margin-top:6px"
          [id]="id + '-contact-' + i + '-job-title'"
          [(ngModel)]="contact.jobTitle"
          ariaLabel="Job Title"
          placeholder="Job Title">
        </ui-input>
        <div class="cif__contact-bottom">
          <ui-input class="cif__input cif__input--email"
            [id]="id + '-contact-' + i + '-email'"
            [(ngModel)]="contact.email"
            [ariaLabel]="'Email ' + (i + 1)"
            [placeholder]="'Email ' + (i + 1)">
          </ui-input>
          <ui-select class="cif__select cif__select--country"
            [id]="id + '-contact-' + i + '-country-code'"
            [options]="countrySelectOptions"
            placeholder="--"
            ariaLabel="Country code"
            [(ngModel)]="contact.countryCode">
          </ui-select>
          <ui-input class="cif__input cif__input--phone"
            [id]="id + '-contact-' + i + '-landline'"
            [(ngModel)]="contact.landline"
            ariaLabel="Landline"
            placeholder="Landline">
          </ui-input>
          <ui-input class="cif__input cif__input--phone"
            [id]="id + '-contact-' + i + '-mobile'"
            [(ngModel)]="contact.mobile"
            ariaLabel="Mobile"
            placeholder="Mobile">
          </ui-input>
        </div>
      </div>

      <!-- Action buttons — navy Back + purple Save matching screenshot -->
      <div class="cif__actions">
        <ui-button class="cif__btn cif__btn--back" variant="primary" [label]="backLabel" (click)="backClick.emit()"></ui-button>
        <ui-button class="cif__btn cif__btn--save" variant="primary" [label]="saveLabel" (click)="saveClick.emit(contacts)"></ui-button>
      </div>
    </ui-panel>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --panel-title-size: 14px;
      --panel-title-transform: uppercase;
      --panel-accent-color: #7b1fa2;
      --panel-padding: 16px 20px;
      --input-border: 1px solid #ccc;
      --input-radius: 3px;
      --input-padding: 7px 10px;
      --input-focus-border-color: #7b1fa2;
    }

    /* Each contact block — matches image20 structure */
    .cif__contact-row {
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f0f0f0;
    }
    .cif__contact-row:last-of-type { border-bottom: none; }

    .cif__input--full { width: 100%; display: block; }
    .cif__input--email { flex: 2; min-width: 0; }
    .cif__input--phone { flex: 1.2; min-width: 0; }

    .cif__contact-bottom {
      display: flex; gap: 8px; margin-top: 6px; flex-wrap: wrap;
      align-items: flex-start;
    }

    .cif__select--country { flex: 1; min-width: 100px; }

    /* Buttons — navy Back + purple Save */
    .cif__actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 16px; }
    .cif__btn--back {
      --btn-bg: #1e3a5f; --btn-color: #fff; --btn-radius: 3px;
      --btn-padding: 9px 28px; --btn-font-size: 14px;
    }
    .cif__btn--save {
      --btn-bg: #7b1fa2; --btn-color: #fff; --btn-radius: 3px;
      --btn-padding: 9px 28px; --btn-font-size: 14px;
    }
  `],
})
export class AmexContactInformationFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `contact-information-form-${++AmexContactInformationFormComponent._idCounter}`;

  @Input() sectionTitle = 'Operations';
  @Input() backLabel = 'Back';
  @Input() saveLabel = 'Save';
  @Input() contacts: ContactRow[] = [
    { name: '', jobTitle: '', email: '', countryCode: '', landline: '', mobile: '' },
    { name: '', jobTitle: '', email: '', countryCode: '', landline: '', mobile: '' },
    { name: '', jobTitle: '', email: '', countryCode: '', landline: '', mobile: '' },
  ];
  @Input() countryCodes: { value: string; label: string }[] = [
    { value: '+971', label: 'UAE (+971)' },
    { value: '+973', label: 'Bahrain (+973)' },
    { value: '+965', label: 'Kuwait (+965)' },
    { value: '+968', label: 'Oman (+968)' },
    { value: '+974', label: 'Qatar (+974)' },
    { value: '+966', label: 'Saudi (+966)' },
  ];
  @Output() saveClick = new EventEmitter<ContactRow[]>();
  @Output() backClick = new EventEmitter<void>();

  get countrySelectOptions(): SelectOption[] {
    return this.countryCodes.map(c => ({ value: c.value, label: c.label }));
  }
}