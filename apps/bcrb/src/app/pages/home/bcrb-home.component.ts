import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexTabBarComponent, AmexTabItem } from '@ui-components/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'bcrb-home',
  standalone: true,
  imports: [CommonModule, AmexTabBarComponent],
  templateUrl: './bcrb-home.component.html',
})
export class BcrbHomeComponent {

  @Output() tabChanged = new EventEmitter<string>();
  
  activeTabId = 'misc';

  tabs: AmexTabItem[] = [
    { id: 'misc', label: 'MISC' },
    { id: 'stmt', label: 'STATEMENTS' },
    { id: 'oas', label: 'ONLINE ACCOUNT SERVICES' },
    { id: 'pb', label: 'CREDIT VERIFIER' },
    { id: 'cp', label: 'ENROLL FOR PRIORITY' },
    { id: 'bureau', label: 'BUREAU' },
  ];

  onTabClick(tabId: string) {
    this.activeTabId = tabId;
    console.log('Tab clicked:', tabId);
    this.tabChanged.emit(tabId);
  }
}
