import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * DLS's "Panel" IS just a single collapsible section — the same
 * .collapsible / .collapsibleCaret / .accordionContent classes AccordionComponent
 * uses for each of its items, just with exactly one item instead of a list.
 * There's no separate DLS "panel" CSS at all (no .panel / .panel-band /
 * .panel-band-body anywhere in DLS) — the old version's banded-header look
 * (blue band, #1a3a6b text, CSS custom-property theming) was entirely
 * invented locally, unrelated to any DLS component.
 *
 * `defaultOpen` replaces the old always-visible static box: previously this
 * component had no collapse behavior at all despite living in the
 * "Collapsible Panels" bucket — it just rendered a static title band + body.
 * Defaulting to open keeps existing usages visually similar (content still
 * shows immediately) while making the header now genuinely toggleable, per
 * DLS's real Collapsible pattern.
 */
@Component({
  selector: 'ui-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <div class="body1" role="heading" [attr.aria-level]="headingLevel" *ngIf="title">
        <button
          type="button"
          class="collapsible"
          [id]="id + '-header'"
          [attr.aria-controls]="id + '-panel'"
          [attr.aria-expanded]="isOpen"
          (click)="toggle()"
        >
          <span class="collapsibleCaret" aria-hidden="true"></span>
          <span>{{ title }}</span>
        </button>
      </div>
      <div
        class="accordionContent"
        *ngIf="isOpen"
        [id]="id + '-panel'"
        role="region"
        [attr.aria-labelledby]="title ? id + '-header' : null"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class PanelComponent implements OnInit {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-panel-${++PanelComponent._idCounter}`;

  @Input() title = '';

  /** Matches AccordionComponent's default heading level. */
  @Input() headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 3;

  /** Whether the panel starts expanded. Defaults to true so existing usages (which had no collapse behavior at all) still show their content immediately. */
  @Input() defaultOpen = true;

  /**
   * Set in ngOnInit rather than as a field initializer — field initializers
   * run before Angular applies @Input bindings, so `isOpen = this.defaultOpen`
   * here would always evaluate against defaultOpen's declared default (true),
   * silently ignoring a [defaultOpen]="false" passed in from a template.
   */
  isOpen = true;

  ngOnInit(): void {
    this.isOpen = this.defaultOpen;
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }
}