import { Component, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  category?: string;
  validFrom?: string;
  validUntil?: string;
  imageUrl?: string;
  enrolled?: boolean;
  hasFlash?: boolean;
  termsAndConditions?: string;
}

/**
 * BenefitsPanel
 * Displays benefits linked to a card member — same grid layout as OffersPanel but
 * for the Benefits tab. Accessed via Online Account Services → Benefits.
 * Source: Supplementary Access, Offers & Benefits
 * Style: Identical grid card layout as OffersPanel — blue #006FCF header.
 */
@Component({
  selector: 'amex-benefits-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bp" role="region" aria-label="Benefits panel">
      <!-- Page header bar -->
      <h2 class="bp__section-header">Benefits</h2>

      <!-- Benefits grid -->
      <div *ngIf="!selectedBenefit" class="bp__grid" role="grid" aria-label="Available benefits">
        <div *ngFor="let b of benefits; let i = index"
             class="bp__card"
             [class.bp__card--enrolled]="b.enrolled"
             (click)="openDetail(b)"
             (keydown)="onCardKeydown($event, i)"
             tabindex="0"
             role="gridcell"
             [attr.aria-label]="getBenefitAriaLabel(b)"
             [attr.aria-describedby]="b.enrolled ? 'enrolled-status-' + i : null"
             #benefitCard
          >

          <div class="bp__card-img-wrap">
            <img *ngIf="b.imageUrl" [src]="b.imageUrl" [alt]="b.title + ' benefit image'" class="bp__card-img" />
            <div *ngIf="!b.imageUrl" class="bp__card-img-placeholder" role="img" aria-label="American Express benefit placeholder">
              <span aria-hidden="true">AMERICAN EXPRESS</span>
            </div>
            <span *ngIf="b.enrolled" class="bp__enrolled-badge" id="enrolled-status-{{i}}" aria-label="Enrolled benefit">Enrolled</span>
          </div>

          <div class="bp__card-body">
            <h3 class="bp__card-title">
              {{ b.title | uppercase }}
              <span *ngIf="b.hasFlash" aria-label="Flash benefit available">⚡</span>
            </h3>
            <p class="bp__card-desc">{{ b.description }}</p>
          </div>

          <div class="bp__card-footer">
            <div class="bp__dates" role="group" aria-label="Benefit validity dates">
              <span *ngIf="b.validFrom" class="bp__date">From: {{ b.validFrom }}</span>
              <span *ngIf="b.validUntil" class="bp__date">Until: {{ b.validUntil }}</span>
            </div>
          </div>
        </div>

        <div *ngIf="benefits.length === 0" class="bp__empty" role="status" aria-live="polite">
          No benefits available for this card member.
        </div>
      </div>

      <!-- Detail view -->
      <div *ngIf="selectedBenefit" class="bp__detail" role="dialog" aria-modal="true" aria-label="Benefit details">
        <div class="bp__detail-img-wrap">
          <img *ngIf="selectedBenefit.imageUrl" [src]="selectedBenefit.imageUrl" [alt]="selectedBenefit.title + ' benefit image'" class="bp__detail-img" />
          <div *ngIf="!selectedBenefit.imageUrl" class="bp__detail-img-fallback" role="img" aria-label="American Express benefit placeholder">
            <span aria-hidden="true">AMERICAN EXPRESS</span>
          </div>
          <button 
            class="bp__detail-close" 
            (click)="closeDetail()" 
            (keydown.enter)="closeDetail()"
            (keydown.space)="closeDetail()"
            type="button"
            aria-label="Close benefit details"
            #closeBtn
          >&#x2715;</button>
        </div>

        <button 
          class="bp__detail-nav bp__detail-nav--left" 
          (click)="prevBenefit()" 
          (keydown.enter)="prevBenefit()"
          (keydown.space)="prevBenefit()"
          type="button"
          aria-label="Previous benefit"
          #prevBtn
        >&#8249;</button>
        <button 
          class="bp__detail-nav bp__detail-nav--right" 
          (click)="nextBenefit()" 
          (keydown.enter)="nextBenefit()"
          (keydown.space)="nextBenefit()"
          type="button"
          aria-label="Next benefit"
          #nextBtn
        >&#8250;</button>

        <div class="bp__detail-info">
          <div class="bp__detail-left">
            <h3 class="bp__detail-name">{{ selectedBenefit.title }}</h3>
            <p class="bp__detail-status"
               [class.bp__detail-status--enrolled]="selectedBenefit.enrolled"
               [class.bp__detail-status--not]="!selectedBenefit.enrolled"
               role="status"
               aria-label="Enrollment status: {{ selectedBenefit.enrolled ? 'Enrolled' : 'Not Enrolled' }}">
              {{ selectedBenefit.enrolled ? 'Enrolled' : 'Not Enrolled' }}
            </p>
            <div class="bp__detail-desc-row">
              <span class="bp__detail-lbl" id="desc-label">Description:</span>
              <p class="bp__detail-desc-text" aria-labelledby="desc-label">{{ selectedBenefit.description }}</p>
            </div>
            <div *ngIf="selectedBenefit.validFrom || selectedBenefit.validUntil" class="bp__detail-validity" role="group" aria-label="Benefit validity period">
              <span *ngIf="selectedBenefit.validFrom" class="bp__detail-date">Valid from {{ selectedBenefit.validFrom }}</span>
              <span *ngIf="selectedBenefit.validUntil"> to {{ selectedBenefit.validUntil }}</span>
            </div>
          </div>

          <div class="bp__detail-right">
            <button 
              *ngIf="!selectedBenefit.enrolled"
              class="bp__enroll-btn"
              (click)="enroll.emit(selectedBenefit)"
              (keydown.enter)="enroll.emit(selectedBenefit)"
              (keydown.space)="enroll.emit(selectedBenefit)"
              type="button"
              aria-label="Enroll in {{ selectedBenefit.title }} benefit"
              #enrollBtn
            >Enroll</button>
            <button 
              *ngIf="selectedBenefit.enrolled"
              class="bp__unenroll-btn"
              (click)="unenroll.emit(selectedBenefit)"
              (keydown.enter)="unenroll.emit(selectedBenefit)"
              (keydown.space)="unenroll.emit(selectedBenefit)"
              type="button"
              aria-label="Unenroll from {{ selectedBenefit.title }} benefit"
              #unenrollBtn
            >Unenroll</button>

            <div *ngIf="selectedBenefit.termsAndConditions" class="bp__detail-tnc">
              <span class="bp__detail-lbl" id="tnc-label">Terms &amp; Conditions</span>
              <p class="bp__detail-tnc-text" aria-labelledby="tnc-label">{{ selectedBenefit.termsAndConditions }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .bp { background: #fff; padding: 16px; }

    .bp__section-header {
      font-size: 15px; font-weight: bold; color: #1a1a1a;
      margin-bottom: 14px; padding-bottom: 8px;
      border-bottom: 2px solid #006fcf;
    }

    .bp__grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
    }

    .bp__card {
      border: 1px solid #ddd; border-radius: 4px; overflow: hidden;
      cursor: pointer; display: flex; flex-direction: column;
      transition: box-shadow 0.15s;
    }
    .bp__card:hover { box-shadow: 0 4px 16px rgba(0,111,207,0.15); }
    .bp__card--enrolled { border-color: #006fcf; }

    .bp__card-img-wrap {
      position: relative; width: 100%; height: 158px;
      background: #b8d4ef; overflow: hidden; flex-shrink: 0;
    }
    .bp__card-img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .bp__card-img-placeholder {
      width: 100%; height: 100%; background: #006fcf;
      display: flex; align-items: center; justify-content: center;
    }
    .bp__card-img-placeholder span {
      color: rgba(255,255,255,0.75); font-size: 12px; font-weight: 700; letter-spacing: 0.08em;
    }
    .bp__enrolled-badge {
      position: absolute; top: 10px; right: 0;
      background: #006fcf; color: #fff;
      font-size: 10px; font-weight: 700; padding: 3px 10px 3px 8px;
    }

    .bp__card-body { flex: 1; padding: 12px 14px 6px; }
    .bp__card-title {
      font-size: 12.5px; font-weight: 700; color: #006fcf;
      margin: 0 0 7px; line-height: 1.4; text-align: center;
    }
    .bp__card-desc { font-size: 12px; color: #555; margin: 0; line-height: 1.5; text-align: center; }

    .bp__card-footer {
      padding: 8px 14px; border-top: 1px solid #f0f0f0; margin-top: 6px;
    }
    .bp__dates { display: flex; gap: 8px; flex-wrap: wrap; }
    .bp__date  { font-size: 11px; color: #888; }

    .bp__empty {
      grid-column: 1/-1; text-align: center; padding: 40px; color: #888; font-size: 13px;
    }

    /* Detail */
    .bp__detail {
      position: relative; background: #fff; border: 1px solid #ddd;
      border-radius: 4px; overflow: hidden;
    }
    .bp__detail-img-wrap {
      position: relative; width: 100%; height: 280px; background: #b8d4ef; overflow: hidden;
    }
    .bp__detail-img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .bp__detail-img-fallback {
      width: 100%; height: 100%; background: #006fcf;
      display: flex; align-items: center; justify-content: center;
    }
    .bp__detail-img-fallback span {
      color: rgba(255,255,255,0.75); font-size: 15px; font-weight: 700; letter-spacing: 0.1em;
    }
    .bp__detail-close {
      position: absolute; top: 10px; right: 10px; width: 28px; height: 28px;
      border-radius: 50%; background: rgba(255,255,255,0.92); border: 1px solid #ccc;
      font-size: 12px; cursor: pointer; color: #333;
      display: flex; align-items: center; justify-content: center;
    }
    .bp__detail-nav {
      position: absolute; top: calc(140px - 18px);
      background: rgba(255,255,255,0.9); border: 1px solid #ddd; border-radius: 50%;
      width: 36px; height: 36px; font-size: 22px; cursor: pointer; color: #555;
      display: flex; align-items: center; justify-content: center;
    }
    .bp__detail-nav--left  { left: 10px; }
    .bp__detail-nav--right { right: 10px; }

    .bp__detail-info { display: flex; gap: 24px; padding: 20px 48px 20px 24px; }
    .bp__detail-left  { flex: 1; }
    .bp__detail-right { display: flex; flex-direction: column; gap: 14px; min-width: 150px; }

    .bp__detail-name   { font-size: 15px; font-weight: 600; color: #006fcf; margin: 0 0 4px; }
    .bp__detail-status { font-size: 13px; font-weight: 600; margin: 0 0 14px; }
    .bp__detail-status--enrolled { color: #2e7d32; }
    .bp__detail-status--not      { color: #333; }

    .bp__detail-desc-row { display: flex; gap: 8px; align-items: flex-start; }
    .bp__detail-lbl  { font-size: 12px; font-weight: 700; color: #006fcf; white-space: nowrap; flex-shrink: 0; }
    .bp__detail-desc-text { font-size: 12px; color: #444; margin: 0; line-height: 1.6; }
    .bp__detail-validity  { font-size: 11px; color: #888; margin-top: 8px; }
    .bp__detail-date      { font-size: 11px; color: #555; }

    .bp__enroll-btn {
      padding: 8px 28px; background: #006fcf; color: #fff;
      border: none; border-radius: 4px; font-size: 14px; font-weight: 700;
      cursor: pointer; align-self: flex-start;
    }
    .bp__enroll-btn:hover { background: #005baa; }
    .bp__unenroll-btn {
      padding: 7px 20px; background: #fff; color: #555;
      border: 1px solid #ccc; border-radius: 4px; font-size: 13px;
      font-weight: 600; cursor: pointer; align-self: flex-start;
    }
    .bp__detail-tnc      { display: flex; flex-direction: column; gap: 4px; }
    .bp__detail-tnc-text { font-size: 12px; color: #444; margin: 0; line-height: 1.5; }
    
    /* Accessibility */
    .bp__card:focus, .bp__detail-close:focus, .bp__detail-nav:focus, .bp__enroll-btn:focus, .bp__unenroll-btn:focus {
      outline: 2px solid #006fcf;
      outline-offset: 2px;
    }
    
    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .bp__card {
        border: 2px solid currentColor;
      }
      .bp__card--enrolled {
        border-color: #006fcf;
        border-width: 3px;
      }
    }
  `],
})
export class AmexBenefitsPanelComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `benefits-panel-${++AmexBenefitsPanelComponent._idCounter}`;


  @Input() benefits: BenefitItem[] = [];
  selectedBenefit: BenefitItem | null = null;
  private _idx = 0;

  @Output() enroll         = new EventEmitter<BenefitItem>();
  @Output() unenroll       = new EventEmitter<BenefitItem>();

  @ViewChild('closeBtn') closeBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('prevBtn') prevBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('nextBtn') nextBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('enrollBtn') enrollBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('unenrollBtn') unenrollBtn!: ElementRef<HTMLButtonElement>;

  openDetail(b: BenefitItem) { 
    this._idx = this.benefits.indexOf(b); 
    this.selectedBenefit = b;
    // Focus management for detail view
    setTimeout(() => {
      this.closeBtn?.nativeElement.focus();
    }, 100);
  }
  
  closeDetail() { 
    this.selectedBenefit = null;
    // Return focus to the grid
    setTimeout(() => {
      const gridCards = document.querySelectorAll('.bp__card');
      if (gridCards.length > 0 && this._idx >= 0 && this._idx < gridCards.length) {
        (gridCards[this._idx] as HTMLElement).focus();
      }
    }, 100);
  }
  
  prevBenefit() { 
    if (this._idx > 0) { 
      this._idx--; 
      this.selectedBenefit = this.benefits[this._idx];
      // Announce navigation to screen readers
      this.announceBenefitChange('Previous benefit');
    } 
  }
  
  nextBenefit() { 
    if (this._idx < this.benefits.length - 1) { 
      this._idx++; 
      this.selectedBenefit = this.benefits[this._idx];
      // Announce navigation to screen readers
      this.announceBenefitChange('Next benefit');
    } 
  }

  onCardKeydown(event: KeyboardEvent, index: number): void {
    // Handle keyboard navigation in the grid
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.openDetail(this.benefits[index]);
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (index < this.benefits.length - 1) {
          const nextCard = document.querySelectorAll('.bp__card')[index + 1] as HTMLElement;
          nextCard?.focus();
        }
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (index > 0) {
          const prevCard = document.querySelectorAll('.bp__card')[index - 1] as HTMLElement;
          prevCard?.focus();
        }
        break;
    }
  }

  getBenefitAriaLabel(benefit: BenefitItem): string {
    let label = benefit.title;
    if (benefit.enrolled) {
      label += ', Enrolled';
    }
    if (benefit.hasFlash) {
      label += ', Flash benefit available';
    }
    if (benefit.validFrom || benefit.validUntil) {
      label += ', Valid';
      if (benefit.validFrom) {
        label += ` from ${benefit.validFrom}`;
      }
      if (benefit.validUntil) {
        label += ` until ${benefit.validUntil}`;
      }
    }
    label += `. ${benefit.description}`;
    return label;
  }

  private announceBenefitChange(direction: string): void {
    // Create a temporary announcement for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `${direction}: ${this.selectedBenefit?.title}`;
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  @HostListener('keydown', ['$event'])
  handleGlobalKeydown(event: KeyboardEvent): void {
    // Handle Escape key to close detail view
    if (event.key === 'Escape' && this.selectedBenefit) {
      this.closeDetail();
    }
  }
}
