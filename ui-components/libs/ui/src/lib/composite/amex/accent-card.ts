import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-accent-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card cardRounded accent-card" [style.width]="width" [style.maxWidth]="maxWidth">
      <div
        class="accentBar"
        [style.background]="accentColor"
        [style.height.px]="accentHeight"
      ></div>
      <div
        class="accent-card-body"
        [style.padding]="padding"
        [style.background]="background"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    // :host display/width — Angular custom elements default to inline; DLS has
    // no concept of a component host tag, so nothing to "call" here.
    //
    // .accent-card flex layout / overflow — reverted to explicit CSS.
    // DLS's flex.css DOES define .flex/.flexColumn/.flexItemGrow/.flexItemShrink
    // utility classes in the raw source package, but testing in Storybook
    // showed .flexColumn wasn't actually taking effect against the compiled
    // dls.min.css actually bundled in this repo (verified via DevTools:
    // .flex matched and worked, .flexColumn did not, causing the accent bar to
    // collapse to 0 width). Since we can't verify node_modules' actual compiled
    // CSS from here, we're not gambling on utility classes that don't
    // demonstrably work in your build — this explicit CSS is confirmed working.
    //
    // box-sizing was NOT re-added — that removal is safe and confirmed, since
    // DLS's global reset (*, *::before, *::after { box-sizing: inherit })
    // already applies it everywhere.
    `
      :host {
        display: block;
        width: 100%;
      }
      .accent-card {
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .accentBar {
        width: 100%;
        flex-shrink: 0;
      }
      .accent-card-body {
        flex: 1;
      }
    `,
  ],
})
export class AccentCardComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-accent-card-${++AccentCardComponent._idCounter}`;

  @HostBinding('style.maxWidth') get hostMaxWidth() {
    return this.maxWidth;
  }

  @Input() accentColor = '#7b1f4b';
  @Input() accentHeight = 4;
  @Input() background = '#ffffff';
  @Input() padding = '24px 20px';
  @Input() width = '100%';
  @Input() maxWidth = '360px';
}