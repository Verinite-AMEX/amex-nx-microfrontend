import { Component, OnInit } from '@angular/core';
import {
  AmexSOCROCEntryFormComponent,
  AmexSuccessToastComponent,
  AmexErrorToastComponent
} from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-capture-multiple-se',
  standalone: true,
  imports: [
    AmexSOCROCEntryFormComponent,
    AmexSuccessToastComponent,
    AmexErrorToastComponent
  ],
  template: `
    <amex-socroc-entry-form
      [showSOC]="captureType === 'SOC'"
      [showROC]="captureType === 'ROC'"
      [rejectionCodes]="rejectionCodes"
      (socAction)="onSocAction($event)"
      (rocAction)="onRocAction($event)">
    </amex-socroc-entry-form>

    @if (status === 'success') {
      <amex-success-toast
        [message]="statusMessage"
        portalStyle="onls"
        [autoDismiss]="true"
        (dismissed)="status = 'idle'">
      </amex-success-toast>
    }

    @if (status === 'error') {
      <amex-error-toast
        [message]="statusMessage"
        portalStyle="onls"
        (dismissed)="status = 'idle'">
      </amex-error-toast>
    }
  `
})
export class CaptureMultipleSe implements OnInit {
  captureType: 'SOC' | 'ROC' = 'SOC';

  rejectionCodes: string[] = [
    '001 - Invalid Card Number',
    '002 - Duplicate Transaction',
    '003 - Expired Card',
    '004 - Insufficient Funds',
    '005 - Invalid Merchant'
  ];

  isLoading: boolean = false;
  status: 'idle' | 'success' | 'error' = 'idle';
  statusMessage: string = '';

  ngOnInit(): void {}

  onSocAction(event: { action: string; soc: any }): void {
    this.isLoading = true;
    // TODO: Replace with SocRocService API call
    setTimeout(() => {
      this.isLoading = false;
      this.status = 'success';
      this.statusMessage = 'Multiple SE data captured successfully.';
    }, 600);
  }

  onRocAction(event: { action: string; roc: any }): void {
    this.isLoading = true;
    // TODO: Replace with SocRocService API call
    setTimeout(() => {
      this.isLoading = false;
      this.status = 'success';
      this.statusMessage = 'Multiple SE data captured successfully.';
    }, 600);
  }
}