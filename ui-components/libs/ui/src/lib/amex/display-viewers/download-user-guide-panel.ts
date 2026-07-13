import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * DownloadUserGuidePanel
 * OMS Portal — panel with two purple buttons: "Download User Guide" (PDF) + "User guide Video".
 * Appears on the OMS login page below the Register section.
 * Source: OMS Portal
 * Style: OMS portal — two full-width dark-purple/maroon buttons stacked vertically.
 */
@Component({
  selector: 'amex-download-user-guide-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dugp">
      <div class="dugp__section-header" *ngIf="showSectionHeader">
        {{ sectionHeaderText }}
      </div>

      <!-- PDF guide button -->
      <button class="dugp__btn dugp__btn--guide" (click)="downloadGuide.emit()">
        {{ guideButtonLabel }}
      </button>

      <!-- Video guide button -->
      <button class="dugp__btn dugp__btn--video" (click)="openVideo.emit()">
        {{ videoButtonLabel }}
      </button>

      <!-- Optional description text -->
      <p *ngIf="description" class="dugp__description">{{ description }}</p>

      <!-- Inline video embed area (shown after clicking video) -->
      <div *ngIf="showVideoEmbed && videoUrl" class="dugp__video-wrap">
        <div class="dugp__video-header">
          User Guide Video
          <button class="dugp__video-close" (click)="showVideoEmbed = false">&#x2715;</button>
        </div>
        <iframe class="dugp__iframe"
                [src]="videoUrl"
                frameborder="0"
                allowfullscreen
                title="User Guide Video">
        </iframe>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; font-size: 12px; }
    .dugp { display: flex; flex-direction: column; gap: 8px; }

    .dugp__section-header {
      background: #e8e8e8; border-top: 2px solid #666;
      padding: 6px 10px; font-size: 12px; font-weight: bold;
      color: #333; margin-bottom: 4px;
    }

    .dugp__btn {
      width: 100%; padding: 10px 14px;
      font-size: 13px; font-weight: bold;
      border: none; cursor: pointer;
      font-family: Arial, sans-serif;
      text-align: center;
      transition: opacity 0.1s;
    }
    .dugp__btn:hover { opacity: 0.88; }

    /* OMS style — dark maroon/purple buttons as seen in screenshot */
    .dugp__btn--guide {
      background: #7b1f5e;
      color: #fff;
    }
    .dugp__btn--video {
      background: #7b1f5e;
      color: #fff;
    }

    .dugp__description {
      font-size: 11px; color: #666; margin: 4px 0 0;
      line-height: 1.5;
    }

    /* Video embed */
    .dugp__video-wrap {
      border: 1px solid #ccc; border-radius: 4px; overflow: hidden;
      margin-top: 8px;
    }
    .dugp__video-header {
      background: #7b1f5e; color: #fff;
      padding: 6px 10px; font-size: 12px; font-weight: bold;
      display: flex; justify-content: space-between; align-items: center;
    }
    .dugp__video-close {
      background: none; border: none; color: #fff;
      font-size: 14px; cursor: pointer; padding: 0 4px;
    }
    .dugp__iframe {
      width: 100%; height: 280px; display: block;
      background: #000;
    }
  `],
})
export class AmexDownloadUserGuidePanelComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `download-user-guide-panel-${++AmexDownloadUserGuidePanelComponent._idCounter}`;


  @Input() showSectionHeader  = false;
  @Input() sectionHeaderText  = 'Help & Resources';
  @Input() guideButtonLabel   = 'Download User Guide';
  @Input() videoButtonLabel   = 'User guide Video';
  @Input() description        = '';
  @Input() videoUrl           = '';
  showVideoEmbed = false;

  @Output() downloadGuide = new EventEmitter<void>();
  @Output() openVideo     = new EventEmitter<void>();
}
