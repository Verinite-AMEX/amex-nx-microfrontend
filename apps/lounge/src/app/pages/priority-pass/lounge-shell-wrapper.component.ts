import { Component, Optional, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AmexPageComponent,
  AmexTabItem,
} from '@ui-components/ui';
import { LoungePriorityPassComponent } from './lounge-priority-pass.component';
import { SHELL_HOSTED } from '../../core/tokens/shell.token';
@Component({
  selector: 'app-lounge-shell-wrapper',
  standalone: true,
  imports: [CommonModule, AmexPageComponent, LoungePriorityPassComponent],
  template: `
    <amex-page-component
      portalStyle="onls"
      portalTitle="ONLS Helper Tool"
      [config]="shellConfig"
      [showSidebar]="false"
      pageTitle="PRIORITY PASS™ ENROLLMENT"
      pageSubtitle="Manage Priority Pass benefit for cardmembers"
      (tabClick)="onTabClick($event)"
      (logout)="onLogout()"
    >
      <app-lounge-priority-pass></app-lounge-priority-pass>
    </amex-page-component>
  `,
})
export class LoungeShellWrapperComponent {
  isShellHosted: boolean;
  constructor(@Optional() @Inject(SHELL_HOSTED) shellHosted: boolean) {
    this.isShellHosted = !!shellHosted;
  }
  get shellConfig() {
    if (this.isShellHosted) {
      return {
        header:  { visible: false },
        footer:  { visible: false },
        sidebar: { visible: false },
      };
    }
    return {
      header:  { visible: false },
      footer:  { visible: true, text: '© American Express. All rights reserved.' },
      sidebar: { visible: false },
    };
  }
  tabs: AmexTabItem[] = [
    { id: 'lounge', label: 'Lounge Rationalization' },
  ];
  onTabClick(_id: string): void {}
  onLogout(): void {
    localStorage.clear();
    window.location.reload();
  }
}