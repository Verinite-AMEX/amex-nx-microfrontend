import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  template: `
    <div class="cif">
      <!-- Section header with purple accent — matches image20 exactly -->
      <div class="cif__section-header">{{ sectionTitle }}</div>
      <div class="cif__accent"></div>

      <div class="cif__panel">
        <!-- Contact rows — each has Name, Job Title, then Email/Country/Landline/Mobile -->
        <div *ngFor="let contact of contacts; let i = index" class="cif__contact-row">
          <input class="cif__input cif__input--full" [(ngModel)]="contact.name"
            [placeholder]="'Name'" />
          <input class="cif__input cif__input--full" [(ngModel)]="contact.jobTitle"
            [placeholder]="'Job Title'" style="margin-top:6px" />
          <div class="cif__contact-bottom">
            <input class="cif__input cif__input--email" [(ngModel)]="contact.email"
              [placeholder]="'Email ' + (i + 1)" />
            <select class="cif__select cif__select--country" [(ngModel)]="contact.countryCode">
              <option value="">--</option>
              <option *ngFor="let c of countryCodes" [value]="c.value">{{ c.label }}</option>
            </select>
            <input class="cif__input cif__input--phone" [(ngModel)]="contact.landline" placeholder="Landline" />
            <input class="cif__input cif__input--phone" [(ngModel)]="contact.mobile" placeholder="Mobile" />
          </div>
        </div>

        <!-- Action buttons — navy Back + purple Save matching screenshot -->
        <div class="cif__actions">
          <button class="cif__btn cif__btn--back" (click)="backClick.emit()">{{ backLabel }}</button>
          <button class="cif__btn cif__btn--save" (click)="saveClick.emit(contacts)">{{ saveLabel }}</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    /* Section header + purple accent — matches OMS image20 */
    .cif__section-header {
      font-size: 14px; font-weight: bold; color: #1a3a6b;
      padding: 0 0 6px; text-transform: uppercase;
    }
    .cif__accent { height: 3px; background: #7b1fa2; margin-bottom: 12px; }

    .cif__panel {
      background: #fff; border: 1px solid #e0e0e0;
      border-radius: 3px; padding: 16px 20px;
    }

    /* Each contact block — matches image20 structure */
    .cif__contact-row {
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f0f0f0;
    }
    .cif__contact-row:last-of-type { border-bottom: none; }

    .cif__input {
      border: 1px solid #ccc; border-radius: 3px;
      padding: 7px 10px; font-size: 13px;
      font-family: Arial, sans-serif; color: #333; outline: none;
      box-sizing: border-box;
    }
    .cif__input:focus { border-color: #7b1fa2; }
    .cif__input--full { width: 100%; display: block; }
    .cif__input--email { flex: 2; min-width: 0; }
    .cif__input--phone { flex: 1.2; min-width: 0; }

    .cif__contact-bottom {
      display: flex; gap: 8px; margin-top: 6px; flex-wrap: wrap;
    }

    .cif__select {
      border: 1px solid #ccc; border-radius: 3px;
      padding: 7px 6px; font-size: 13px;
      font-family: Arial, sans-serif; background: #fff; outline: none;
    }
    .cif__select--country { flex: 1; min-width: 100px; }
    .cif__select:focus { border-color: #7b1fa2; }

    /* Buttons — navy Back + purple Save */
    .cif__actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 16px; }
    .cif__btn {
      padding: 9px 28px; font-size: 14px; font-weight: bold;
      border: none; border-radius: 3px; cursor: pointer;
      font-family: Arial, sans-serif;
    }
    .cif__btn--back   { background: #1e3a5f; color: #fff; }
    .cif__btn--back:hover { background: #16304f; }
    .cif__btn--save   { background: #7b1fa2; color: #fff; }
    .cif__btn--save:hover { background: #6a1b9a; }
  `],
})
export class AmexContactInformationFormComponent {
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
}
