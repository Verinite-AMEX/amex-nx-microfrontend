import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcasePageComponent } from '../../showcase-page';
import { VariantSectionComponent } from '../../variant-section';
import {
  AmexSuccessToastComponent,
  AmexErrorToastComponent,
  AmexInlineValidationErrorComponent,
  AmexConfirmationModalComponent,
  AmexDuplicateSubmissionWarningComponent,
  AmexFileUploadProgressComponent,
  AmexResetPasswordConfirmComponent,
} from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-amex-feedback-page',
  standalone: true,
  imports: [
    CommonModule,
    ShowcasePageComponent,
    VariantSectionComponent,
    AmexSuccessToastComponent,
    AmexErrorToastComponent,
    AmexInlineValidationErrorComponent,
    AmexConfirmationModalComponent,
    AmexDuplicateSubmissionWarningComponent,
    AmexFileUploadProgressComponent,
    AmexResetPasswordConfirmComponent,
  ],
  template: `
    <app-showcase-page
      title="AMEX Feedback"
      description="Feedback components matching exact designs from the AEME portal screenshots. Each component supports both portal styles: ONLS (older IBM WEF portal) and OMS (newer modern portal)."
    >

      <!-- Portal style labels -->
      <div class="style-legend">
        <span class="style-legend__badge style-legend__badge--onls">ONLS Style</span>
        <span class="style-legend__desc">ONLS Helper / SOC&amp;ROC portal — IBM WEF, blue tabs, gradient buttons</span>
        <span class="style-legend__badge style-legend__badge--oms">OMS Style</span>
        <span class="style-legend__desc">OMS / BCRB / Centurion portal — navy + purple, white cards</span>
      </div>

      <!-- 1. Success Messages -->
      <app-variant-section title="Success Message">
        <div class="two-col">
          <div class="two-col__col">
            <div class="two-col__label onls-label">ONLS — Forgot Password Sent</div>
            <amex-success-toast
              portalStyle="onls"
              message="An Email has been sent to user@americanexpress.com.bh containing the User ID and Password."
              [dismissible]="false"
            ></amex-success-toast>
          </div>
          <div class="two-col__col">
            <div class="two-col__label oms-label">OMS — User Created</div>
            <amex-success-toast
              portalStyle="oms"
              message="User account created successfully."
              [dismissible]="true"
            ></amex-success-toast>
          </div>
        </div>
      </app-variant-section>

      <!-- 2. Error Messages -->
      <app-variant-section title="Error Message">
        <div class="two-col">
          <div class="two-col__col">
            <div class="two-col__label onls-label">ONLS — Login Failed</div>
            <amex-error-toast
              portalStyle="onls"
              message="Invalid User ID or Password. Please try again."
              [showRetry]="false"
            ></amex-error-toast>
          </div>
          <div class="two-col__col">
            <div class="two-col__label oms-label">OMS — Backend Error</div>
            <amex-error-toast
              portalStyle="oms"
              message="NO RESPONSE FROM BACKEND. CONTACT ADMIN."
              [showRetry]="true"
            ></amex-error-toast>
          </div>
        </div>
      </app-variant-section>

      <!-- 3. Inline Validation Errors -->
      <app-variant-section title="Inline Validation Error">
        <div class="two-col">
          <div class="two-col__col">
            <div class="two-col__label onls-label">ONLS — Plain red text below field</div>
            <div class="field-demo">
              <input class="onls-input onls-input--error" value="" placeholder="User ID" />
              <amex-inline-validation-error portalStyle="onls" message="This field is required."></amex-inline-validation-error>
            </div>
            <div class="field-demo" style="margin-top:12px">
              <input class="onls-input onls-input--error" value="" placeholder="Password" />
              <amex-inline-validation-error portalStyle="onls" message="Password must be at least 8 characters."></amex-inline-validation-error>
            </div>
          </div>
          <div class="two-col__col">
            <div class="two-col__label oms-label">OMS — Tooltip callout (SOC &amp; ROC style)</div>
            <div class="field-demo">
              <input class="oms-input" value="" placeholder="Currency" />
              <amex-inline-validation-error portalStyle="oms" message="This value is required."></amex-inline-validation-error>
            </div>
            <div class="field-demo" style="margin-top:20px">
              <input class="oms-input" value="" placeholder="IBAN (last 5 digits)" />
              <amex-inline-validation-error portalStyle="oms" message="Last 5 digits of IBAN are incorrect."></amex-inline-validation-error>
            </div>
          </div>
        </div>
      </app-variant-section>

      <!-- 4. Duplicate Submission Warning -->
      <app-variant-section title="Duplicate Submission Warning">
        <div class="two-col">
          <div class="two-col__col">
            <div class="two-col__label onls-label">ONLS — Yellow warning box</div>
            <amex-duplicate-submission-warning
              portalStyle="onls"
              clientId="CL-7823041"
            ></amex-duplicate-submission-warning>
          </div>
          <div class="two-col__col">
            <div class="two-col__label oms-label">OMS — Card with orange accent</div>
            <amex-duplicate-submission-warning
              portalStyle="oms"
              clientId="CTN-100234"
              proceedLabel="Issue Anyway"
            ></amex-duplicate-submission-warning>
          </div>
        </div>
      </app-variant-section>

      <!-- 5. File Upload Progress -->
      <app-variant-section title="File Upload Progress">
        <div class="two-col">
          <div class="two-col__col">
            <div class="two-col__label onls-label">ONLS — Bordered box</div>
            <amex-file-upload-progress portalStyle="onls" fileName="SOC_batch_file.xlsx" [percent]="55" status="uploading" [showCancel]="true"></amex-file-upload-progress>
            <amex-file-upload-progress style="display:block;margin-top:8px" portalStyle="onls" fileName="SOC_batch_file.xlsx" [percent]="100" status="completed" [showCancel]="false"></amex-file-upload-progress>
          </div>
          <div class="two-col__col">
            <div class="two-col__label oms-label">OMS — White card panel</div>
            <amex-file-upload-progress portalStyle="oms" fileName="BCRB_bulk_report_Oct2024.csv" [percent]="45" status="uploading" [showCancel]="true"></amex-file-upload-progress>
            <amex-file-upload-progress style="display:block;margin-top:8px" portalStyle="oms" fileName="BCRB_bulk_report_Oct2024.csv" [percent]="75" status="processing" [showCancel]="false"></amex-file-upload-progress>
            <amex-file-upload-progress style="display:block;margin-top:8px" portalStyle="oms" fileName="BCRB_bulk_report_Oct2024.csv" [percent]="100" status="completed" [showCancel]="false"></amex-file-upload-progress>
            <amex-file-upload-progress style="display:block;margin-top:8px" portalStyle="oms" fileName="BCRB_bulk_report_Oct2024.csv" [percent]="60" status="failed" [showCancel]="false"></amex-file-upload-progress>
          </div>
        </div>
      </app-variant-section>

      <!-- 6. Confirmation Modal -->
      <app-variant-section title="Confirmation Modal">
        <div class="modal-triggers">
          <div>
            <div class="two-col__label onls-label" style="margin-bottom:6px">ONLS — Browser-style dialog</div>
            <button class="onls-demo-btn" (click)="showOnlsAlert.set(true)">Open Alert (Email Sent)</button>
            <button class="onls-demo-btn" style="margin-left:8px" (click)="showOnlsLogout.set(true)">Open Logout</button>
          </div>
          <div style="margin-top:14px">
            <div class="two-col__label oms-label" style="margin-bottom:6px">OMS — Card dialog</div>
            <button class="oms-demo-btn" (click)="showOmsDelete.set(true)">Open Delete User</button>
            <button class="oms-demo-btn" style="margin-left:8px" (click)="showOmsReset.set(true)">Open Reset Password</button>
          </div>
        </div>

        <amex-confirmation-modal [visible]="showOnlsAlert()" portalStyle="onls"
          siteLabel="tst-websrv01 says"
          message="An Email has been sent to user@americanexpress.com.bh containing the User ID and Password."
          confirmLabel="OK" cancelLabel=""
          (confirm)="showOnlsAlert.set(false)" (cancel)="showOnlsAlert.set(false)">
        </amex-confirmation-modal>

        <amex-confirmation-modal [visible]="showOnlsLogout()" portalStyle="onls"
          siteLabel="tst-websrv01 says"
          message="Are you sure you want to logout?"
          confirmLabel="OK" cancelLabel="Cancel"
          (confirm)="showOnlsLogout.set(false)" (cancel)="showOnlsLogout.set(false)">
        </amex-confirmation-modal>

        <amex-confirmation-modal [visible]="showOmsDelete()" portalStyle="oms"
          title="Delete User Account"
          message="This will permanently remove the user account. This action cannot be undone."
          confirmLabel="Delete" cancelLabel="Back"
          (confirm)="showOmsDelete.set(false)" (cancel)="showOmsDelete.set(false)">
        </amex-confirmation-modal>

        <amex-confirmation-modal [visible]="showOmsReset()" portalStyle="oms"
          title="Reset Password"
          message="A temporary password will be sent to the user's registered email address."
          confirmLabel="Reset Password" cancelLabel="Back"
          (confirm)="showOmsReset.set(false)" (cancel)="showOmsReset.set(false)">
        </amex-confirmation-modal>
      </app-variant-section>

      <!-- 7. Reset Password Confirm -->
      <app-variant-section title="Reset Password Confirm">
        <div class="modal-triggers">
          <div>
            <div class="two-col__label onls-label" style="margin-bottom:6px">ONLS style</div>
            <button class="onls-demo-btn" (click)="showOnlsResetPwd.set(true)">Open ONLS Reset Dialog</button>
          </div>
          <div style="margin-top:14px">
            <div class="two-col__label oms-label" style="margin-bottom:6px">OMS style</div>
            <button class="oms-demo-btn" (click)="showOmsResetPwd.set(true)">Open OMS Reset Dialog</button>
          </div>
        </div>

        <amex-reset-password-confirm [visible]="showOnlsResetPwd()" portalStyle="onls"
          userName="hquaid" userEmail="user@americanexpress.com.bh"
          (confirm)="showOnlsResetPwd.set(false)" (cancel)="showOnlsResetPwd.set(false)">
        </amex-reset-password-confirm>

        <amex-reset-password-confirm [visible]="showOmsResetPwd()" portalStyle="oms"
          userName="wasimtest123" userEmail="wasim.sayyed@americanexpress.com.bh"
          (confirm)="showOmsResetPwd.set(false)" (cancel)="showOmsResetPwd.set(false)">
        </amex-reset-password-confirm>
      </app-variant-section>

    </app-showcase-page>
  `,
  styles: [`
    /* Legend */
    .style-legend {
      display: flex; align-items: center; gap: 10px;
      flex-wrap: wrap; margin-bottom: 28px;
      padding: 10px 14px; background: #f9f9f9; border: 1px solid #e8e8e8; border-radius: 4px;
      font-family: Arial, sans-serif; font-size: 12px; color: #666;
    }
    .style-legend__badge {
      padding: 2px 10px; border-radius: 10px; font-size: 11px; font-weight: bold;
    }
    .style-legend__badge--onls { background: #e3f0ff; color: #006fcf; }
    .style-legend__badge--oms  { background: #f3e5f5; color: #7b1fa2; }

    /* Two-column layout */
    .two-col { display: flex; gap: 24px; width: 100%; flex-wrap: wrap; }
    .two-col__col { flex: 1; min-width: 280px; }
    .two-col__label { font-size: 11px; font-weight: bold; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; }
    .onls-label { color: #006fcf; }
    .oms-label  { color: #7b1fa2; }

    /* Field demos */
    .field-demo { display: flex; flex-direction: column; }
    .onls-input {
      border: 1px solid #aaa; padding: 4px 8px; font-size: 13px;
      font-family: Arial, sans-serif; width: 220px;
    }
    .onls-input--error { border-color: #c0392b; }
    .oms-input {
      border: 1px solid #ccc; border-radius: 4px; padding: 6px 10px;
      font-size: 13px; font-family: Arial, sans-serif; width: 220px;
    }

    /* Demo buttons */
    .onls-demo-btn {
      background: linear-gradient(to bottom, #5ba3e0, #006fcf);
      color: #fff; border: 1px solid #005fba;
      padding: 5px 16px; font-size: 13px; cursor: pointer;
      font-family: Arial, sans-serif; border-radius: 3px;
    }
    .onls-demo-btn:hover { background: linear-gradient(to bottom, #4a92cf, #0058a6); }
    .oms-demo-btn {
      background: #1e3a5f; color: #fff; border: none;
      padding: 8px 18px; font-size: 13px; cursor: pointer;
      font-family: Arial, sans-serif; border-radius: 3px; font-weight: bold;
    }
    .oms-demo-btn:hover { background: #16304f; }

    /* Modal trigger layout */
    .modal-triggers { display: flex; flex-direction: column; width: 100%; }
  `],
})
export class AmexFeedbackPageComponent {
  showOnlsAlert   = signal(false);
  showOnlsLogout  = signal(false);
  showOmsDelete   = signal(false);
  showOmsReset    = signal(false);
  showOnlsResetPwd = signal(false);
  showOmsResetPwd  = signal(false);
}
