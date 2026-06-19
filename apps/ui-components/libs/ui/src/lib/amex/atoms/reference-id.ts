import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'amex-reference-id',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="amex-ref">
      <span *ngIf="prefix" class="amex-ref__prefix">{{ prefix }}</span>
      <span class="amex-ref__id">{{ id }}</span>
    </span>
  `,
  styles: [`
    .amex-ref {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: #f0f4ff;
      border: 1px solid #c7d7fd;
      border-radius: 4px;
      padding: 2px 8px;
      font-family: 'Courier New', monospace;
      font-size: 12px;
    }
    .amex-ref__prefix {
      color: #5069c4;
      font-weight: 700;
      font-size: 10px;
      text-transform: uppercase;
    }
    .amex-ref__id { color: #1a237e; font-weight: 500; }
  `],
})
export class AmexReferenceIdComponent {
  /** The reference/request/SOC/ROC ID value */
  @Input() id = '';
  /** Optional prefix label e.g. "REQ", "SOC", "ROC", "REP" */
  @Input() prefix = '';
}
