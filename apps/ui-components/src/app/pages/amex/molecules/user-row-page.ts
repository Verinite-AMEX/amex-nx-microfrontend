import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcasePageComponent } from '../../showcase-page';
import { VariantSectionComponent } from '../../variant-section';
import { AmexUserRowComponent, AmexUser } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-user-row-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, AmexUserRowComponent, CommonModule],
  template: `
    <app-showcase-page title="AMEX User Row" description="User management row with role, status and action buttons.">
      <app-variant-section title="User List">
        <div style="width:100%;border:1px solid #f0f0f0;border-radius:8px;overflow:hidden">
          <amex-user-row
            *ngFor="let u of users"
            [user]="u"
            (edit)="onEdit($event)"
            (resetPassword)="onReset($event)"
            (toggleStatus)="onToggle($event)">
          </amex-user-row>
        </div>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class UserRowPageComponent {
  users: AmexUser[] = [
    { id: 'U1', name: 'John Smith', email: 'john.smith@amex.com', role: 'master-admin', status: 'active', lastLogin: '25 Mar 2024' },
    { id: 'U2', name: 'Jane Doe', email: 'jane.doe@amex.com', role: 'sub-admin', status: 'active', lastLogin: '24 Mar 2024' },
    { id: 'U3', name: 'Mark Wilson', email: 'mark.wilson@amex.com', role: 'mrm', status: 'inactive', lastLogin: '10 Feb 2024' },
    { id: 'U4', name: 'Sara Ahmed', email: 'sara.ahmed@amex.com', role: 'vat-user', status: 'active', lastLogin: '22 Mar 2024' },
    { id: 'U5', name: 'Ali Hassan', email: 'ali.hassan@amex.com', role: 'travel-agent', status: 'locked', lastLogin: '01 Jan 2024' },
  ];
  onEdit(u: AmexUser) { alert(`Edit: ${u.name}`); }
  onReset(u: AmexUser) { alert(`Reset password for: ${u.name}`); }
  onToggle(u: AmexUser) { u.status = u.status === 'active' ? 'inactive' : 'active'; }
}