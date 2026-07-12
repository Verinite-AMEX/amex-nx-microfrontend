import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AmexMenuBarLink { id: string; label: string; }

/**
 * DashboardMenuBar
 * Matches the BCRB portal top banner with Bureau dropdown selector and sub-nav links.
 * Source: BCRB Report doc — "Bureau" dropdown + report type links row
 */
@Component({
  selector: 'amex-dashboard-menu-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="menubar">
      <!-- Bureau dropdown -->
      <div class="menubar__bureau" *ngIf="showBureauDropdown">
        <label class="menubar__label" [for]="id + '-field'">{{ bureauLabel }}</label>
        <select [id]="id + '-field'" class="menubar__select"
          [value]="activeBureauId"
          (change)="onBureauChange($event)">
          <option *ngFor="let opt of bureauOptions" [value]="opt.id">{{ opt.label }}</option>
        </select>
      </div>

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
    .menubar__label {
      font-size: 13px; color: #333; white-space: nowrap;
    }
    .menubar__select {
      border: 1px solid #bbb; border-radius: 2px;
      padding: 3px 8px; font-size: 12px;
      font-family: Arial, sans-serif; color: #333;
      background: #fff; cursor: pointer;
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
  @HostBinding('attr.id') readonly id = `dashboard-menu-bar-${++AmexDashboardMenuBarComponent._idCounter}`;


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

  onBureauChange(event: Event) {
    this.bureauChange.emit((event.target as HTMLSelectElement).value);
  }
}
