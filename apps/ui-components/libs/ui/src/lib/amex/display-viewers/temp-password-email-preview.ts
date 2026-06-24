import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * TempPasswordEmailPreview
 * Email template preview showing the temporary password delivered to the user inbox.
 * Source: Online Helper — shown after admin resets a user password.
 * Style: BTA/ONLS email template — bordered white box, blue header panel.
 */
@Component({
  selector: 'amex-temp-password-email-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tpep">
      <div class="tpep__header">Email Preview</div>
      <div class="tpep__email">
        <table class="tpep__meta">
          <tr>
            <td class="tpep__meta-label">From:</td>
            <td class="tpep__meta-value">{{ fromAddress }}</td>
          </tr>
          <tr>
            <td class="tpep__meta-label">To:</td>
            <td class="tpep__meta-value">{{ toAddress }}</td>
          </tr>
          <tr>
            <td class="tpep__meta-label">Subject:</td>
            <td class="tpep__meta-value">{{ subject }}</td>
          </tr>
        </table>
        <div class="tpep__divider"></div>
        <div class="tpep__body">
          <p class="tpep__greeting">Dear {{ userName }},</p>
          <p class="tpep__text">
            Your account has been created / your password has been reset for the
            <strong>{{ portalName }}</strong> portal.
          </p>
          <p class="tpep__text">Please use the following temporary credentials to log in:</p>
          <div class="tpep__creds">
            <div class="tpep__cred-row">
              <span class="tpep__cred-label">User ID:</span>
              <span class="tpep__cred-value">{{ userId }}</span>
            </div>
            <div class="tpep__cred-row">
              <span class="tpep__cred-label">Temporary Password:</span>
              <span class="tpep__cred-value tpep__cred-value--pw">{{ tempPassword }}</span>
            </div>
          </div>
          <p class="tpep__text">
            You will be required to change your password upon first login.
          </p>
          <p class="tpep__text">
            Access the portal here:
            <a class="tpep__link" [href]="portalUrl" target="_blank">{{ portalUrl }}</a>
          </p>
          <p class="tpep__text tpep__text--small">
            If you did not request this, please contact your system administrator immediately.
          </p>
          <p class="tpep__sign">
            Regards,<br/>
            <strong>American Express AEME Team</strong>
          </p>
        </div>
        <div class="tpep__footer">
          This is an auto-generated email. Please do not reply to this message.
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .tpep { max-width: 600px; }
    .tpep__header {
      background: #b8d4ef; color: #1a3c5e;
      font-weight: bold; font-size: 13px;
      padding: 8px 12px; border: 1px solid #a0bcd8; border-bottom: none;
    }
    .tpep__email {
      border: 1px solid #a0bcd8; background: #fff;
    }
    .tpep__meta {
      width: 100%; border-collapse: collapse;
      background: #f5f9ff; border-bottom: 1px solid #d0e4f0;
    }
    .tpep__meta-label {
      padding: 5px 12px; font-size: 12px; font-weight: bold;
      color: #555; width: 80px;
    }
    .tpep__meta-value { padding: 5px 8px; font-size: 12px; color: #1a1a1a; }
    .tpep__divider { height: 1px; background: #d0e4f0; }
    .tpep__body { padding: 20px 24px; }
    .tpep__greeting { font-size: 13px; font-weight: bold; margin: 0 0 12px; color: #1a1a1a; }
    .tpep__text { font-size: 13px; color: #333; margin: 0 0 10px; line-height: 1.6; }
    .tpep__text--small { font-size: 11px; color: #888; }
    .tpep__creds {
      background: #f0f8ff; border: 1px solid #b0cce0;
      padding: 12px 16px; margin: 12px 0; border-radius: 2px;
    }
    .tpep__cred-row { display: flex; gap: 12px; margin-bottom: 6px; }
    .tpep__cred-row:last-child { margin-bottom: 0; }
    .tpep__cred-label { font-size: 12px; font-weight: bold; color: #555; min-width: 140px; }
    .tpep__cred-value { font-size: 12px; color: #1a1a1a; }
    .tpep__cred-value--pw { font-weight: bold; color: #006fcf; letter-spacing: 0.05em; }
    .tpep__link { color: #006fcf; word-break: break-all; }
    .tpep__sign { font-size: 13px; color: #333; margin: 16px 0 0; line-height: 1.8; }
    .tpep__footer {
      padding: 10px 24px; font-size: 11px; color: #888;
      border-top: 1px solid #e0e0e0; background: #fafafa;
    }
  `],
})
export class AmexTempPasswordEmailPreviewComponent {
  @Input() fromAddress = 'no-reply@aeme.americanexpress.com';
  @Input() toAddress   = 'user@example.com';
  @Input() subject     = 'Your AEME Portal Temporary Password';
  @Input() userName    = 'John Doe';
  @Input() userId      = 'jdoe_onlshelper';
  @Input() tempPassword = 'Temp@12345';
  @Input() portalName  = 'AEME Online Helper';
  @Input() portalUrl   = 'https://tst-wassrv02/wps/portal/onlshelper/';
}
