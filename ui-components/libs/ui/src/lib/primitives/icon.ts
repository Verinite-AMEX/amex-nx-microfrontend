// libs/ui/src/lib/atoms/icon.ts
import {
  AfterContentInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="ui-icon"
      [attr.aria-hidden]="decorative ? 'true' : null"
      [attr.aria-label]="!decorative ? ariaLabel : null"
      [attr.role]="!decorative ? 'img' : null"
    >
      <span #projectedSlot class="ui-icon-projected">
        <ng-content></ng-content>
      </span>
      <span *ngIf="!hasProjectedContent" class="ui-icon-glyph">{{ glyph }}</span>
    </span>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .ui-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--icon-size, 16px);
      height: var(--icon-size, 16px);
      font-size: var(--icon-size, 16px);
      line-height: 1;
    }
    .ui-icon-projected:empty {
      display: none;
    }
    :host ::ng-deep .ui-icon-projected svg {
      width: 100%;
      height: 100%;
    }
  `],
})
export class IconComponent implements AfterContentInit {
  @Input() glyph = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() ariaLabel = '';
  @Input() decorative = true;

  @ViewChild('projectedSlot', { static: true }) projectedSlot!: ElementRef<HTMLElement>;

  hasProjectedContent = false;

  @HostBinding('style.--icon-size')
  get iconSizeVar(): string {
    const sizeMap: { [key: string]: string } = { sm: '14px', md: '16px', lg: '20px' };
    return sizeMap[this.size] || sizeMap['md'];
  }

  ngAfterContentInit(): void {
    // Real detection of projected content (e.g. a custom <svg>) rather than
    // guessing off `glyph` — supports the documented
    // <ui-icon><svg>...</svg></ui-icon> passthrough usage.
    this.hasProjectedContent = this.projectedSlot.nativeElement.childNodes.length > 0;
  }
}