import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { NotificationToastComponent, ButtonComponent } from '@vn-core-ui-components/ui';
import { CommonModule } from '@angular/common';

interface Toast { variant: 'info'|'success'|'warning'|'error'; title: string; message: string; id: number; }

@Component({ selector: 'app-notification-toast-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, NotificationToastComponent, ButtonComponent, CommonModule],
  template: `
    <app-showcase-page title="Notification Toast" description="Temporary feedback messages with auto-dismiss.">
      <app-variant-section title="Trigger Toasts">
        <ui-button label="Info" variant="primary" size="sm" (click)="show('info','Update','A new version is ready.')"></ui-button>
        <ui-button label="Success" variant="primary" size="sm" (click)="show('success','Saved!','Changes saved successfully.')"></ui-button>
        <ui-button label="Warning" variant="secondary" size="sm" (click)="show('warning','','Low disk space detected.')"></ui-button>
        <ui-button label="Error" variant="secondary" size="sm" (click)="show('error','Failed','Upload failed. Try again.')"></ui-button>
      </app-variant-section>
      <app-variant-section title="Static Previews">
        <ui-notification-toast variant="info" title="Info" message="Informational message." [duration]="0"></ui-notification-toast>
        <ui-notification-toast variant="success" title="Done" message="Action completed." [duration]="0"></ui-notification-toast>
        <ui-notification-toast variant="error" title="Error" message="Something went wrong." [duration]="0"></ui-notification-toast>
      </app-variant-section>
    </app-showcase-page>
    <div style="position:fixed;bottom:24px;right:24px;display:flex;flex-direction:column;gap:8px;z-index:9999">
      <ui-notification-toast *ngFor="let t of toasts" [variant]="t.variant" [title]="t.title" [message]="t.message" [duration]="3000" (dismissed)="remove(t.id)"></ui-notification-toast>
    </div>
  `,
})
export class NotificationToastPageComponent {
  toasts: Toast[] = [];
  private counter = 0;

  show(variant: Toast['variant'], title: string, message: string) {
    const id = ++this.counter;
    this.toasts.push({ variant, title, message, id });
  }

  remove(id: number) { this.toasts = this.toasts.filter(t => t.id !== id); }
}
