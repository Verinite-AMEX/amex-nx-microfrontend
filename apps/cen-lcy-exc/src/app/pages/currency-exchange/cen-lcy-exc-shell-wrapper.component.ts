import { Component, Optional, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AmexPageShellComponent,
  AmexTabItem,
} from '@vn-core-ui-components/ui';
import { CenLcyExcComponent } from './cen-lcy-exc.component';
import { SHELL_HOSTED } from '../../core/tokens/shell.token';

@Component({
  selector: 'app-cen-lcy-exc-shell-wrapper',
  standalone: true,
  imports: [CommonModule, AmexPageShellComponent, CenLcyExcComponent],
  template: `
    <amex-page-component
      portalStyle="onls"
      portalTitle="ONLS Helper Tool"
      [config]="shellConfig"
      [showSidebar]="false"
      
      (tabClick)="onTabClick($event)"
      (logout)="onLogout()"
    >
      <app-cen-lcy-exc></app-cen-lcy-exc>
    </amex-page-component>
  `,
})
export class CenLcyExcShellWrapperComponent {
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
    { id: 'cen-lcy-exc', label: 'Cen LCY EXC' },
  ];

  onTabClick(_id: string): void {}

  onLogout(): void {
    localStorage.clear();
    window.location.reload();
  }
}
