import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AmexDashboardMenuBarComponent
} from '@ui-components/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'bcrb-dashboard',
  standalone: true,
  imports: [CommonModule, AmexDashboardMenuBarComponent],
  templateUrl: './bcrb-dashboard.component.html',
})
export class BcrbDashboardComponent {

  @Output() linkChanged = new EventEmitter<string>();

  activeBureauId = '';
  activeLinkId = '';

  bureauOptions = [
    { id: 'aecb', label: 'AECB' },
    { id: 'simah', label: 'SIMAH' }
  ];

  links = [
    { id: 'bcrb', label: 'BCRB REPORT' },
    { id: 'aecb-upload', label: 'AECB UPLOAD' }
  ];

  onBureauChange(id: string) {
    this.activeBureauId = id;
    console.log('Selected Bureau:', id);
  }

  onLinkClick(id: string) {
    this.activeLinkId = id;
    console.log('Selected Link:', id);
    this.linkChanged.emit(id);
  }
}
