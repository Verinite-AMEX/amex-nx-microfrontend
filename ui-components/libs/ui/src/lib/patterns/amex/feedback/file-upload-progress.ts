import { Component, Input, Output, EventEmitter, OnChanges, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexPortalStyle } from './success-toast';
import { ButtonComponent } from '../../../primitives/button';

export type AmexUploadStatus = 'uploading' | 'processing' | 'completed' | 'failed';

@Component({
  selector: 'amex-file-upload-progress',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div [class]="portalStyle === 'onls' ? 'onls-upload' : 'oms-upload'">

      <!-- ONLS style: simple bordered box with filename and status text -->
      <ng-container *ngIf="portalStyle === 'onls'">
        <div class="onls-upload__row">
          <span class="onls-upload__label">File:</span>
          <span class="onls-upload__filename">{{ fileName || 'No file chosen' }}</span>
          <span class="onls-upload__status" [ngClass]="'onls-upload__status--' + status">
            {{ statusLabel }}
          </span>
              <ui-button
                *ngIf="showCancel && status === 'uploading'"
                class="onls-btn-cancel"
                label="Cancel"
                size="sm"
                variant="ghost"
                (click)="cancel.emit()">
              </ui-button>
        </div>
        <div class="onls-upload__bar-track">
          <div class="onls-upload__bar-fill"
            [ngClass]="'onls-upload__bar-fill--' + status"
            [style.width.%]="displayPercent">
          </div>
        </div>
        <div class="onls-upload__pct">{{ displayPercent }}%</div>
      </ng-container>

      <!-- OMS style: card panel with file icon + progress bar (matches BCRB upload panel) -->
      <ng-container *ngIf="portalStyle === 'oms'">
        <div class="oms-upload__header">
          <div class="oms-upload__left">
            <span class="oms-upload__file-icon">📄</span>
            <div>
              <div class="oms-upload__filename">{{ fileName || 'No file selected' }}</div>
              <div class="oms-upload__sub">{{ displayPercent }}% — {{ statusLabel }}</div>
            </div>
          </div>
          <span class="oms-upload__badge" [ngClass]="'oms-upload__badge--' + status">{{ statusLabel }}</span>
        </div>
        <div class="oms-upload__bar-track">
          <div class="oms-upload__bar-fill"
            [ngClass]="'oms-upload__bar-fill--' + status"
            [style.width.%]="displayPercent">
          </div>
        </div>
        <div class="oms-upload__footer">
          <ui-button
            *ngIf="showCancel && status === 'uploading'"
            class="oms-btn-cancel"
            label="Cancel Upload"
            size="sm"
            variant="ghost"
            (click)="cancel.emit()">
          </ui-button>
        </div>
      </ng-container>

    </div>
  `,
  styles: [`
    /* ONLS: clean bordered box */
    .onls-upload {
      border: 1px solid #ccc;
      background: #f9f9f9;
      padding: 10px 14px;
      font-family: Arial, sans-serif;
      max-width: 520px;
    }
    .onls-upload__row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; flex-wrap: wrap; }
    .onls-upload__label { font-size: 12px; font-weight: bold; color: #555; }
    .onls-upload__filename { font-size: 12px; color: #222; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .onls-upload__status { font-size: 12px; font-weight: bold; white-space: nowrap; }
    .onls-upload__status--uploading  { color: #006fcf; }
    .onls-upload__status--processing { color: #5c35a8; }
    .onls-upload__status--completed  { color: #2e7d32; }
    .onls-upload__status--failed     { color: #c0392b; }
    .onls-upload__bar-track { height: 6px; background: #ddd; border-radius: 0; }
    .onls-upload__bar-fill { height: 100%; transition: width 0.4s; border-radius: 0; }
    .onls-upload__bar-fill--uploading  { background: #006fcf; }
    .onls-upload__bar-fill--processing { background: #5c35a8; }
    .onls-upload__bar-fill--completed  { background: #2e7d32; }
    .onls-upload__bar-fill--failed     { background: #c0392b; }
    .onls-upload__pct { font-size: 11px; color: #888; margin-top: 4px; }
   
    /* OMS: white card panel */
    .oms-upload {
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      padding: 14px 16px;
      font-family: Arial, sans-serif;
      max-width: 520px;
    }
    .oms-upload__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .oms-upload__left { display: flex; align-items: center; gap: 10px; }
    .oms-upload__file-icon { font-size: 24px; }
    .oms-upload__filename { font-size: 13px; font-weight: bold; color: #1a1a1a; }
    .oms-upload__sub { font-size: 12px; color: #888; margin-top: 2px; }
    .oms-upload__badge {
      font-size: 11px; font-weight: bold; padding: 3px 10px; border-radius: 12px; white-space: nowrap;
    }
    .oms-upload__badge--uploading  { background: #e3f2fd; color: #1565c0; }
    .oms-upload__badge--processing { background: #ede7f6; color: #5c35a8; }
    .oms-upload__badge--completed  { background: #e8f5e9; color: #2e7d32; }
    .oms-upload__badge--failed     { background: #ffebee; color: #c62828; }
    .oms-upload__bar-track { height: 6px; background: #e0e0e0; border-radius: 3px; overflow: hidden; }
    .oms-upload__bar-fill { height: 100%; transition: width 0.4s; border-radius: 3px; }
    .oms-upload__bar-fill--uploading  { background: #1976d2; }
    .oms-upload__bar-fill--processing { background: #5c35a8; }
    .oms-upload__bar-fill--completed  { background: #2e7d32; }
    .oms-upload__bar-fill--failed     { background: #c62828; }
    .oms-upload__footer { margin-top: 8px; }

        .onls-btn-cancel {
      --btn-bg: transparent;
      --btn-color: #c0392b;
      --btn-border: 1px solid #c0392b;
      --btn-padding: 2px 8px;
      --btn-radius: 2px;
      --btn-font-size: 11px;
    }

    .oms-btn-cancel {
      --btn-bg: transparent;
      --btn-color: #c62828;
      --btn-border: 1px solid #c62828;
      --btn-padding: 3px 12px;
      --btn-radius: 3px;
      --btn-font-size: 12px;
    }

  `],
})
export class AmexFileUploadProgressComponent implements OnChanges {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `file-upload-progress-${++AmexFileUploadProgressComponent._idCounter}`;

  @Input() fileName = '';
  @Input() percent = 0;
  @Input() status: AmexUploadStatus = 'uploading';
  @Input() portalStyle: AmexPortalStyle = 'oms';
  @Input() showCancel = true;
  @Output() cancel = new EventEmitter<void>();

  displayPercent = 0;

  get statusLabel(): string {
    return { uploading: 'Uploading', processing: 'Processing', completed: 'Completed', failed: 'Failed' }[this.status];
  }

  ngOnChanges() {
    this.displayPercent = this.status === 'completed' ? 100 : Math.min(this.percent, 99);
  }
}
