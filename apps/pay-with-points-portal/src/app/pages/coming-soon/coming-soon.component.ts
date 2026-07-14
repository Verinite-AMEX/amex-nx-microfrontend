import { Component }     from '@angular/core';
import { CommonModule }  from '@angular/common';
import { Router }        from '@angular/router';

@Component({
  selector:   'app-coming-soon',
  standalone: true,
  imports:    [CommonModule],
  template: `
    <div class="coming-soon">
      <div class="coming-soon__icon">🚧</div>
      <h3 class="coming-soon__title">Coming Soon</h3>
      <p class="coming-soon__text">
        This page is not yet implemented.<br>
        Please select another option from the <strong>Misc</strong> menu.
      </p>
      <button class="coming-soon__btn" (click)="goBack()">
        ← Back to Pay With Points
      </button>
    </div>
  `,
  styles: [`
    .coming-soon {
      display: flex; flex-direction: column; align-items: center;
      justify-content: center; padding: 60px 20px; text-align: center;
      font-family: Arial, sans-serif;
    }
    .coming-soon__icon  { font-size: 48px; margin-bottom: 16px; }
    .coming-soon__title { font-size: 20px; color: #1c3f72; margin-bottom: 8px; }
    .coming-soon__text  { font-size: 13px; color: #555; line-height: 1.6; margin-bottom: 20px; }
    .coming-soon__btn {
      background: #1c3f72; color: #fff; border: none;
      padding: 8px 20px; font-size: 12px; font-weight: bold;
      cursor: pointer; border-radius: 2px;
    }
    .coming-soon__btn:hover { background: #003087; }
  `],
})
export class ComingSoonComponent {
  constructor(private router: Router) {}
  goBack(): void { this.router.navigate(['/pay-with-points']); }
}
