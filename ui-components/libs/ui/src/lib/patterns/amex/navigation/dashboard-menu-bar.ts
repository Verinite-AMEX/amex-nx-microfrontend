import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../../composite/form-field';
import { SelectComponent, SelectOption } from '../../../primitives/select';

export interface AmexMenuBarLink { id: string; label: string; }

/**
 * DashboardMenuBar
 * Matches the BCRB portal top banner with Bureau dropdown selector and sub-nav links.
 * Source: BCRB Report doc — "Bureau" dropdown + report type links row
 */
@Component({
  selector: 'amex-dashboard-menu-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, FormFieldComponent, SelectComponent],
  template: `
    <div class="menubar">
      <!-- Bureau dropdown -->
      <ui-form-field class="menubar__bureau" *ngIf="showBureauDropdown"
        [label]="bureauLabel" [forId]="id + '-field'" layout="horizontal">
        <ui-select [id]="id + '-field'" class="menubar__select"
          [options]="bureauSelectOptions"
          [ariaLabel]="bureauLabel"
          [ngModel]="activeBureauId"
          (ngModelChange)="onBureauChange($event)">
        </ui-select>
      </ui-form-field>

      <!-- sub-nav links -->
      <div class="menubar__links" *ngIf="links && links.length">
        <span *ngFor="let link of links"
          class="menubar__link"
          [class.menubar__link--active]="link.id === activeLinkId"
          (click)="linkClick.emit(link.id)">
          {{ link.label }}
        </span>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    .menubar {
      background: #fff;
      border-bottom: 1px solid #e0e0e0;
      padding: 6px 16px;
      display: flex; align-items: center; gap: 24px; flex-wrap: wrap;
      font-size: 13px;
    }
    .menubar__bureau {
      display: flex; align-items: center; gap: 8px;
    }
    .menubar__select {
      min-width: 140px;
    }
    .menubar__links {
      display: flex; align-items: center; gap: 4px; flex-wrap: wrap;
    }
    .menubar__link {
      color: #006fcf; font-size: 13px;
      padding: 2px 8px; cursor: pointer;
      border-radius: 2px; white-space: nowrap;
    }
    .menubar__link:hover { text-decoration: underline; }
    .menubar__link--active {
      font-weight: bold; color: #003087;
      background: #e8f0f8; border-radius: 2px;
    }
  `],
})
export class AmexDashboardMenuBarComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `dashboard-menu-bar-${++AmexDashboardMenuBarComponent._idCounter}`;

  @Input() showBureauDropdown = true;
  @Input() bureauLabel = 'Bureau';
  @Input() bureauOptions: AmexMenuBarLink[] = [
    { id: 'aecb', label: 'AECB' },
    { id: 'simah', label: 'SIMAH' },
    { id: 'bni', label: 'BNI' },
  ];
  @Input() activeBureauId = 'aecb';
  @Input() links: AmexMenuBarLink[] = [];
  @Input() activeLinkId = '';
  @Output() bureauChange = new EventEmitter<string>();
  @Output() linkClick = new EventEmitter<string>();

  get bureauSelectOptions(): SelectOption[] {
    return this.bureauOptions.map((opt) => ({ label: opt.label, value: opt.id }));
  }

  onBureauChange(value: string | number) {
    this.activeBureauId = String(value);
    this.bureauChange.emit(this.activeBureauId);
  }
}