import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

import { AmexChangePasswordFormComponent } from "@ui-components/ui";

@Component({
  selector: "oms-change-password",

  standalone: true,

  imports: [CommonModule, AmexChangePasswordFormComponent],

  templateUrl: "./oms-change-password.component.html",

  styles: [
    `
      :host {
        width: 100%;
      }

      .oms-change-password-page {
        display: flex;
        align-items: stretch;
        gap: 24px;
        background: #eaeaea;
        padding: 32px;
        box-sizing: border-box;
        min-height: 480px;
      }

      .oms-change-password-page__form {
        flex: 0 0 400px;
        max-width: 400px;
      }

      .oms-change-password-page__media {
        flex: 1 1 auto;
        position: relative;
        min-width: 0;
        overflow: hidden;
        background: linear-gradient(135deg, #cfd8e3 0%, #aab8c9 100%);
      }

      .oms-change-password-page__media-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .oms-change-password-page__title {
        color: #3f1189;
        font-size: 20px;
        font-weight: 400;
        margin: 0 0 12px 0;
      }

      /* Shown only when no [mediaImageUrl] is supplied — a neutral stand-in
         so the layout renders correctly before a real photo asset is wired
         up, without the page depending on network access. */
      .oms-change-password-page__media-placeholder {
        width: 100%;
        height: 100%;
        min-height: 340px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        color: #6b7a8d;
      }

      .oms-change-password-page__media-placeholder svg {
        width: 56px;
        height: 56px;
        opacity: 0.6;
      }

      .oms-change-password-page__media-placeholder span {
        font-size: 12px;
        letter-spacing: 0.02em;
      }

      .oms-change-password-page__media-badge {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        padding: 18px 24px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
        text-align: left;
        min-width: 260px;
        box-sizing: border-box;
      }

      .oms-change-password-page__media-badge-brand {
        font-family: Arial, sans-serif;
        font-size: 24px;
        color: #016fd0;
        line-height: 1;
      }

      .oms-change-password-page__media-badge-brand strong {
        color: #002663;
        font-weight: bold;
      }

      .oms-change-password-page__media-badge-caption {
        margin-top: 6px;
        font-family: Arial, sans-serif;
        font-size: 11px;
        letter-spacing: 0.03em;
        color: #555;
      }

      @media (max-width: 900px) {
        .oms-change-password-page {
          flex-direction: column;
        }
        .oms-change-password-page__media {
          display: none;
        }
        .oms-change-password-page__form {
          flex: 1 1 auto;
          max-width: none;
        }
      }
    `,
  ],
})
export class OmsChangePasswordComponent {
  @Input()
  portalStyle: 'onls' | 'oms' = 'oms';
  @Input()
  formTitle = 'Change Password';
  @Input()
  currentPasswordLabel = 'Current Password';
  @Input()
  newPasswordLabel = 'New Password';
  @Input()
  confirmPasswordLabel = 'Confirm New Password';
  @Input()
  submitButtonLabel = '';
  @Input()
  errorMessage = '';
  @Input()
  successMessage = '';
  @Input()
  panelBackground = '';
  @Input()
  showHeader = true;

  /** Photo shown in the right-hand half of the page. Leave empty to fall
   * back to a neutral placeholder (no photo asset required). */
  @Input()
  mediaImageUrl = '';
  @Input()
  mediaImageAlt = 'Merchant reviewing account details on a tablet';
  /** Set false to hide the right-hand media column entirely (e.g. embedding
   * this page inside a narrower shell that already handles its own layout). */
  @Input()
  showMedia = true;
}