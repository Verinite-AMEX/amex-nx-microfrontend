import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

@Component({
  selector: 'ui-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav aria-label="Breadcrumb">
      <ol class="breadcrumb" [class.nonInteractive]="!interactive">
        <li
          *ngFor="let item of items; let last = last"
          [attr.aria-current]="last ? 'page' : null"
        >
          @if (item.href && !last) {
            <a [href]="item.href" class="linkUnderlined breadcrumbItem">
              <span>{{ item.label }}</span>
            </a>
          } @else {
            <span class="breadcrumbItem">{{ item.label }}</span>
          }
        </li>
      </ol>
    </nav>
  `,
})
export class BreadcrumbComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id =
    `ui-breadcrumb-${++BreadcrumbComponent._idCounter}`;

  @Input() items: BreadcrumbItem[] = [];

  /** Set false to render DLS's real `.nonInteractive` variant — a plain trail with no links at all. */
  @Input() interactive = true;
}