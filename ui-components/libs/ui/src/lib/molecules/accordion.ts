import { Component, Input, ViewChildren, QueryList, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../atoms/button';
import { IconComponent } from '../atoms/icon';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

@Component({
  selector: 'ui-accordion',
  standalone: true,
  imports: [CommonModule, ButtonComponent, IconComponent],
  template: `
    <div class="accordion">
      <div *ngFor="let item of items; let i = index" class="accordion-item" [class.open]="isOpen(item.id)">
        <ui-button class="accordion-header-btn"
          variant="ghost"
          [fullWidth]="true"
          [label]="item.title"
          [id]="item.id + '-header'"
          [ariaControls]="item.id + '-panel'"
          [ariaExpanded]="isOpen(item.id)"
          (click)="toggle(item.id)"
          (keydown)="onKeydown($event, i)">
          <ui-icon slot="icon-end" [glyph]="isOpen(item.id) ? '▲' : '▼'" size="sm" [decorative]="true"></ui-icon>
        </ui-button>
        <div class="accordion-body" *ngIf="isOpen(item.id)" id="{{item.id}}-panel" role="region" [attr.aria-labelledby]="item.id + '-header'">
          <p>{{ item.content }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .accordion { font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 6px; overflow: hidden; }
    .accordion-item { border-bottom: 1px solid #e0e0e0; }
    .accordion-item:last-child { border-bottom: none; }
    .accordion-header-btn {
      --btn-bg: #fff;
      --btn-color: #333;
      --btn-radius: 0;
      --btn-padding: 14px 16px;
      --btn-font-size: 14px;
    }
    .accordion-item.open .accordion-header-btn {
      --btn-bg: #f5f9ff;
      --btn-color: #1976d2;
    }
    .accordion-body { padding: 12px 16px 16px; font-size: 14px; color: #555; line-height: 1.6; background: #fff; }
  `],
})
export class AccordionComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-accordion-${++AccordionComponent._idCounter}`;

  @Input() items: AccordionItem[] = [];
  @Input() multiple = false;

  openIds = new Set<string>();

  @ViewChildren(ButtonComponent) headerButtons!: QueryList<ButtonComponent>;

  isOpen(id: string) { return this.openIds.has(id); }

  toggle(id: string) {
    if (this.openIds.has(id)) {
      this.openIds.delete(id);
    } else {
      if (!this.multiple) this.openIds.clear();
      this.openIds.add(id);
    }
  }

  onKeydown(e: KeyboardEvent, index: number) {
    const max = this.items.length - 1;
    let next = index;
    if (e.key === 'ArrowDown') {
      next = index === max ? 0 : index + 1;
      e.preventDefault();
      this.focusHeader(next);
    } else if (e.key === 'ArrowUp') {
      next = index === 0 ? max : index - 1;
      e.preventDefault();
      this.focusHeader(next);
    } else if (e.key === 'Home') {
      e.preventDefault();
      this.focusHeader(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      this.focusHeader(max);
    }
  }

  private focusHeader(idx: number) {
    this.headerButtons?.toArray()[idx]?.focus();
  }
}