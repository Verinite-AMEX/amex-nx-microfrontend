import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AmexBreadcrumbItem { id: string; label: string; }

/**
 * BreadcrumbTrail
 * Matches OMS portal: "Home > Section > Current Page" + Back button
 * Also used in BCRB: "BUREAU > BCRB REPORT > AECB UPLOAD"
 */
@Component({
  selector: 'amex-breadcrumb-trail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="breadcrumb">
      <ng-container *ngFor="let item of items; let last = last">
        <span class="breadcrumb__item"
          [class.breadcrumb__item--link]="!last"
          [class.breadcrumb__item--current]="last"
          (click)="!last && itemClick.emit(item.id)">
          {{ item.label }}
        </span>
        <span *ngIf="!last" class="breadcrumb__sep">&gt;</span>
      </ng-container>
      <span *ngIf="showBack" class="breadcrumb__back" (click)="backClick.emit()">
        &#8592; Back
      </span>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .breadcrumb {
      display: flex; align-items: center; flex-wrap: wrap;
      padding: 5px 8px; font-size: 12px;
      background: #fff; border-bottom: 1px solid #e8e8e8; gap: 2px;
    }
    .breadcrumb__item { color: #555; white-space: nowrap; }
    .breadcrumb__item--link {
      color: #006fcf; cursor: pointer; font-weight: bold;
    }
    .breadcrumb__item--link:hover { text-decoration: underline; }
    .breadcrumb__item--current { color: #333; font-weight: bold; }
    .breadcrumb__sep { color: #999; margin: 0 5px; }
    .breadcrumb__back {
      color: #006fcf; cursor: pointer; margin-left: 12px;
      font-weight: bold;
    }
    .breadcrumb__back:hover { text-decoration: underline; }
  `],
})
export class AmexBreadcrumbTrailComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `breadcrumb-trail-${++AmexBreadcrumbTrailComponent._idCounter}`;


  @Input() items: AmexBreadcrumbItem[] = [];
  @Input() showBack = false;
  @Input() separator = '>';
  @Output() itemClick = new EventEmitter<string>();
  @Output() backClick = new EventEmitter<void>();
}
