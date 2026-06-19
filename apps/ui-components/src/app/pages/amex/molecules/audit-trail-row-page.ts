import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcasePageComponent } from '../../showcase-page';
import { VariantSectionComponent } from '../../variant-section';
import { AmexAuditTrailRowComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-audit-trail-row-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, AmexAuditTrailRowComponent, CommonModule],
  template: `
    <app-showcase-page title="AMEX Audit Trail Row" description="Timeline audit log entry showing action, actor, timestamp and outcome.">
      <app-variant-section title="Full Audit Log">
        <div style="width:100%;padding:16px;background:#fff;border:1px solid #e8e8f0;border-radius:8px">
          <amex-audit-trail-row *ngFor="let e of entries" [entry]="e"></amex-audit-trail-row>
        </div>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class AuditTrailRowPageComponent {
  entries = [
    { timestamp: '2024-03-12 09:14:22', user: 'john.smith@amex.com', userRole: 'Master Admin', action: 'Card Application Approved', details: 'Platinum card approved for RICHARD BLACK', ipAddress: '10.20.1.55', status: 'approved' as const },
    { timestamp: '2024-03-12 10:02:11', user: 'jane.doe@amex.com', userRole: 'Sub Admin', action: 'Credit Limit Updated', details: 'Limit changed from AED 20,000 to AED 30,000', ipAddress: '10.20.1.62', status: 'completed' as const },
    { timestamp: '2024-03-12 11:45:00', user: 'ali.hassan@amex.com', userRole: 'User', action: 'Login Attempt Failed', details: 'Invalid OTP — 3rd attempt', ipAddress: '192.168.5.11', status: 'rejected' as const },
    { timestamp: '2024-03-12 13:30:05', user: 'sara.ahmed@amex.com', userRole: 'VAT User', action: 'Statement Downloaded', details: 'February 2024 statement PDF exported', status: 'completed' as const },
  ];
}