import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-variant-section',
  standalone: true,
  template: `
    <div class="section">
      <h2 class="section-title">{{ title }}</h2>
      <div class="section-body"><ng-content></ng-content></div>
    </div>
  `,
  styles: [`
    .section { margin-bottom: 40px; }
    .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #999; margin: 0 0 16px; padding-bottom: 8px; border-bottom: 1px solid #e8e8e8; }
    .section-body { display: flex; flex-wrap: wrap; gap: 12px; align-items: flex-start; }
  `],
})
export class VariantSectionComponent {
  @Input() title = '';
}
