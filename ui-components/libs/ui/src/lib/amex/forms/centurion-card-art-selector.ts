import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioComponent } from '../../atoms/radio';
import { CheckboxComponent } from '../../atoms/checkbox';
import { ButtonComponent } from '../../atoms/button';

/* ─── CenturionCardArtSelector ─── */
export interface CardArtOption { id: string; label: string; color: string; }

@Component({
  selector: 'amex-centurion-card-art-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, RadioComponent, CheckboxComponent, ButtonComponent],
  template: `
    <div class="ccas">
      <div class="ccas__title">{{ title }}</div>
      <div class="ccas__divider"></div>
      <div class="ccas__grid">
        <div *ngFor="let art of cardArts"
          class="ccas__card"
          [class.ccas__card--selected]="selectedArt === art.id"
          (click)="selectedArt = art.id">
          <div class="ccas__card-art" [style.background]="art.color">
            <div class="ccas__card-chip"></div>
            <div class="ccas__card-logo">AMEX</div>
          </div>
          <div class="ccas__card-label">{{ art.label }}</div>
          <ui-radio class="ccas__radio" name="cardArt" [value]="art.id" [(ngModel)]="selectedArt"></ui-radio>
        </div>
      </div>
      <div class="ccas__wearable-opt">
        <ui-checkbox [(ngModel)]="includeWearable" label="Include Wearable product with this card issuance"></ui-checkbox>
      </div>
      <div class="ccas__actions">
        <ui-button class="ccas__btn ccas__btn--back" variant="primary" label="Back" (click)="backClick.emit()"></ui-button>
        <ui-button class="ccas__btn ccas__btn--confirm" variant="primary" label="Confirm Selection"
          [disabled]="!selectedArt"
          (click)="confirmClick.emit({artId: selectedArt, includeWearable})"></ui-button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .ccas__title { font-size: 16px; font-weight: bold; color: #1a3a6b; padding: 0 0 6px; }
    .ccas__divider { height: 2px; background: #1a3a6b; margin-bottom: 16px; }
    .ccas__grid { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 18px; }
    .ccas__card {
      display: flex; flex-direction: column; align-items: center; gap: 6px;
      cursor: pointer; padding: 8px; border: 2px solid transparent;
      border-radius: 6px; transition: border-color 0.15s;
    }
    .ccas__card--selected { border-color: #1a3a6b; }
    .ccas__card-art {
      width: 90px; height: 56px; border-radius: 5px;
      position: relative; display: flex; align-items: flex-end; justify-content: flex-end;
      padding: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    }
    .ccas__card-chip {
      position: absolute; top: 10px; left: 10px;
      width: 16px; height: 12px; background: #d4a843;
      border-radius: 2px; opacity: 0.8;
    }
    .ccas__card-logo { font-size: 8px; color: #fff; font-weight: bold; opacity: 0.9; }
    .ccas__card-label { font-size: 11px; color: #555; text-align: center; max-width: 90px; }
    .ccas__radio { display: none; }
    .ccas__wearable-opt { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
    .ccas__actions { display: flex; gap: 10px; }
    .ccas__btn--back { --btn-bg: #1e3a5f; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 9px 24px; --btn-font-size: 13px; }
    .ccas__btn--confirm { --btn-bg: #1a3a6b; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 9px 24px; --btn-font-size: 13px; }
  `],
})
export class AmexCenturionCardArtSelectorComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `centurion-card-art-selector-${++AmexCenturionCardArtSelectorComponent._idCounter}`;

  @Input() title = 'Select Card Art';
  @Input() cardArts: CardArtOption[] = [
    { id: 'black', label: 'Classic Black', color: '#1a1a1a' },
    { id: 'navy', label: 'Navy Blue', color: '#1e3a5f' },
    { id: 'gold', label: 'Gold Edition', color: '#b8860b' },
    { id: 'platinum', label: 'Platinum', color: '#888' },
  ];
  selectedArt = '';
  includeWearable = false;
  @Output() confirmClick = new EventEmitter<{ artId: string; includeWearable: boolean }>();
  @Output() backClick    = new EventEmitter<void>();
}