import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-showcase-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <h1 class="page-title">{{ title }}</h1>
      <p *ngIf="description" class="page-desc">{{ description }}</p>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .page { max-width: 900px; }
    .page-title { font-size: 28px; font-weight: 700; color: #1a1a2e; margin: 0 0 8px; }
    .page-desc { font-size: 15px; color: #666; margin: 0 0 32px; line-height: 1.5; }
  `],
})
export class ShowcasePageComponent {
  @Input() title = '';
  @Input() description = '';
}
