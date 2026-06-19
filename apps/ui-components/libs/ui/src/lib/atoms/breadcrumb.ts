import { Component, Input } from '@angular/core';
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
      <ol class="breadcrumb">
        <li *ngFor="let item of items; let last = last" class="breadcrumb-item" [class.active]="last">
          <a *ngIf="item.href && !last" [href]="item.href" class="breadcrumb-link">{{ item.label }}</a>
          <span *ngIf="!item.href || last">{{ item.label }}</span>
          <span *ngIf="!last" class="breadcrumb-sep">{{ separator }}</span>
        </li>
      </ol>
    </nav>
  `,
  styles: [`
    .breadcrumb { display: flex; flex-wrap: wrap; list-style: none; padding: 0; margin: 0; gap: 4px; align-items: center; }
    .breadcrumb-item { display: flex; align-items: center; gap: 4px; font-size: 14px; font-family: Arial, sans-serif; color: #666; }
    .breadcrumb-item.active { color: #333; font-weight: 600; }
    .breadcrumb-link { color: #1976d2; text-decoration: none; }
    .breadcrumb-link:hover { text-decoration: underline; }
    .breadcrumb-sep { color: #bbb; }
  `],
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
  @Input() separator = '/';
}
