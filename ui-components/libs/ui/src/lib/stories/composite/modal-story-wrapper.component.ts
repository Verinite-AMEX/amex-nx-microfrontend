import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../composite/modal';
import { ButtonComponent } from '../../primitives/button';

// Holds real open/closed state in an actual Angular component (guaranteed to
// work with normal change detection), instead of relying on Storybook's
// updateArgs reactivity, which behaved inconsistently for this output-driven
// close interaction in this Storybook/Angular version. Kept in its own file
// (not inline inside a .stories.ts file) since an earlier inline version
// caused an unrelated parse error in that context.
@Component({
  selector: 'modal-story-wrapper',
  standalone: true,
  imports: [CommonModule, ModalComponent, ButtonComponent],
  template: `
    <ui-button
      label="Open modal"
      variant="primary"
      (click)="isOpen = true"
    ></ui-button>
    <ui-modal
      [open]="isOpen"
      [title]="title"
      [size]="size"
      [hasFooter]="hasFooter"
      [closeOnBackdrop]="closeOnBackdrop"
      (closed)="isOpen = false"
    >
      <ng-content></ng-content>
      <div slot="footer">
        <ui-button
          label="Cancel"
          variant="secondary"
          size="sm"
          (click)="isOpen = false"
        ></ui-button>
        <ui-button
          label="Delete"
          variant="primary"
          size="sm"
          (click)="isOpen = false"
        ></ui-button>
      </div>
    </ui-modal>
  `,
})
export class ModalStoryWrapperComponent {
  @Input() title = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() hasFooter = false;
  @Input() closeOnBackdrop = true;
  isOpen = true;
}