import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexSidebarMenuComponent, AmexTopNavBarComponent } from '@ui-components/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'bcrb-sidebar',
  standalone: true,
  imports: [CommonModule, AmexSidebarMenuComponent, AmexTopNavBarComponent],
  templateUrl: './bcrb-sidebar.component.html',
})
export class BcrbSidebarComponent {

  @Output() menuChanged = new EventEmitter<string>();

  activeId = 'corp-monthly';

  items = [
    { id: 'cons-monthly', label: 'Consumer Monthly Audit Report' },
    { id: 'corp-monthly', label: 'Corporate Monthly Audit Report' },
    { id: 'cons-data', label: 'Consumer Data Audit Report' },
    { id: 'corp-data', label: 'Corporate Data Audit Report' },
    { id: 'cons-full', label: 'Consumer Full Report' },
    { id: 'corp-full', label: 'Corporate Full Report' },
    { id: 'cons-history', label: 'Consumer History Report' },
    { id: 'corp-history', label: 'Corporate History Report' }
  ];

  onMenuClick(id: string) {
    this.activeId = id;
    this.menuChanged.emit(id);
    console.log('Selected Menu:', id);
  }
}