import { Component, HostListener, HostBinding } from '@angular/core';

@Component({
  selector: 'amex-skip-links',
  standalone: true,
  template: `
    <div class="skip-links" role="navigation" aria-label="Skip navigation links">
      <a 
        href="#main-content" 
        class="skip-link" 
        (click)="skipToMainContent($event)"
        (keydown.enter)="skipToMainContent($event)"
        (keydown.space)="skipToMainContent($event)"
      >
        Skip to main content
      </a>
      <a 
        href="#navigation" 
        class="skip-link"
        (click)="skipToNavigation($event)"
        (keydown.enter)="skipToNavigation($event)"
        (keydown.space)="skipToNavigation($event)"
      >
        Skip to navigation
      </a>
      <a 
        href="#search" 
        class="skip-link"
        (click)="skipToSearch($event)"
        (keydown.enter)="skipToSearch($event)"
        (keydown.space)="skipToSearch($event)"
      >
        Skip to search
      </a>
    </div>
  `,
  styles: [`
    .skip-links {
      position: fixed;
      top: -40px;
      left: 0;
      right: 0;
      z-index: 9999;
      display: flex;
      justify-content: center;
      gap: 8px;
      padding: 8px;
      background: #006fcf;
    }

    .skip-link {
      display: block;
      padding: 8px 16px;
      background: #006fcf;
      color: #fff;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      border-radius: 4px;
      transition: all 0.2s ease;
    }

    .skip-link:hover,
    .skip-link:focus {
      background: #005baa;
      color: #fff;
      text-decoration: underline;
      outline: 2px solid #fff;
      outline-offset: 2px;
    }

    .skip-links:focus-within {
      top: 0;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .skip-links {
        background: #000;
        border: 2px solid #fff;
      }
      
      .skip-link {
        background: #000;
        border: 1px solid #fff;
      }
      
      .skip-link:hover,
      .skip-link:focus {
        background: #fff;
        color: #000;
        border-color: #000;
      }
    }
  `]
})
export class SkipLinksComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `skip-links-${++SkipLinksComponent._idCounter}`;


  @HostListener('keydown', ['$event'])
  handleGlobalKeydown(event: KeyboardEvent): void {
    // Show skip links when Tab key is pressed
    if (event.key === 'Tab') {
      document.querySelector('.skip-links')?.classList.add('visible');
    }
  }

  skipToMainContent(event: Event): void {
    event.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  }

  skipToNavigation(event: Event): void {
    event.preventDefault();
    const navigation = document.getElementById('navigation');
    if (navigation) {
      navigation.focus();
      navigation.scrollIntoView({ behavior: 'smooth' });
    }
  }

  skipToSearch(event: Event): void {
    event.preventDefault();
    const search = document.getElementById('search');
    if (search) {
      search.focus();
      search.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
