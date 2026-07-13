import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

interface CardArt   { id: string; label: string; color: string; }
interface CardMember { name: string; cardEnding: string; selectedArtId: string | null; selectedWearable: boolean; }

@Component({
  selector: 'app-cent-personalize',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="pers-page">

      <div class="client-id-section" *ngIf="!clientSubmitted">
        <div class="field-label">Client ID</div>
        <div class="field-row">
          <input
            class="client-input"
            type="text"
            [(ngModel)]="clientId"
            placeholder="Enter Client ID"
          />
          <button class="btn-submit" (click)="onClientSubmit()">Submit</button>
        </div>
        <div class="field-error" *ngIf="clientError">{{ clientError }}</div>
      </div>

      <div class="art-section" *ngIf="clientSubmitted">

        <div class="art-grid-header">
          <div class="art-col-spacer"></div>
          <div class="art-col-header" *ngFor="let art of cardArts">
            <div class="art-card-img" [style.background]="art.color">
              <div class="art-card-chip"></div>
              <div class="art-card-logo">AMERICAN EXPRESS</div>
            </div>
            <div class="art-col-label">{{ art.label }}</div>
          </div>
          <div class="art-col-header wearable-col">
            <div class="art-wearable-img">
              <div class="wearable-belt-img">PRADA×CENTURION</div>
            </div>
            <div class="art-col-label">Prada Centurion Wearable</div>
            <div class="art-col-sublabel">1 of 2 wearables assigned</div>
          </div>
        </div>

        <div class="art-grid-body">
          <div class="art-row" *ngFor="let member of cardMembers">
            <div class="art-row-name">
              <span class="member-name">{{ member.name }}</span>
              <span class="member-card">Card Ending {{ member.cardEnding }}</span>
            </div>
            <div class="art-row-cell" *ngFor="let art of cardArts">
              <input
                type="checkbox"
                class="art-checkbox"
                [checked]="member.selectedArtId === art.id"
                (change)="onArtSelect(member, art.id, $event)"
              />
            </div>
            <div class="art-row-cell wearable-col">
              <input
                type="checkbox"
                class="art-checkbox wearable-check"
                [(ngModel)]="member.selectedWearable"
              />
            </div>
          </div>
        </div>

        <div class="art-actions">
          <button class="btn-clear"  (click)="onClearSelections()">Clear Selections</button>
          <button class="btn-assign" (click)="onAssignPreference()">Assign Preference</button>
        </div>

      </div>

    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; font-size: 13px; }
    .pers-page { padding: 20px 24px; }
    .client-id-section { margin-bottom: 20px; }
    .field-label  { font-size: 13px; color: #333; margin-bottom: 8px; font-weight: bold; }
    .field-row    { display: flex; align-items: center; gap: 10px; }
    .client-input { border: 1px solid #ccc; padding: 5px 10px; font-size: 13px; width: 220px; }
    .btn-submit {
      background: linear-gradient(to bottom, #5ba3e0, #006fcf);
      color: #fff; border: 1px solid #005fba;
      padding: 5px 18px; font-size: 13px; cursor: pointer;
    }
    .btn-submit:hover { background: linear-gradient(to bottom, #4a92cf, #0058a6); }
    .field-error { color: #cc0000; font-size: 12px; margin-top: 4px; }
    .art-grid-header {
      display: flex; align-items: flex-end;
      border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 0;
    }
    .art-col-spacer  { width: 200px; flex-shrink: 0; }
    .art-col-header  { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center; }
    .wearable-col    { flex: 1; }
    .art-card-img {
      width: 80px; height: 50px; border-radius: 5px;
      position: relative; display: flex;
      align-items: flex-end; justify-content: flex-end;
      padding: 5px; box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    }
    .art-card-chip {
      position: absolute; top: 8px; left: 8px;
      width: 14px; height: 10px;
      background: #d4a843; border-radius: 2px; opacity: 0.8;
    }
    .art-card-logo    { font-size: 6px; color: #fff; font-weight: bold; opacity: 0.9; }
    .art-col-label    { font-size: 12px; color: #006fcf; font-weight: bold; text-align: center; }
    .art-col-sublabel { font-size: 11px; color: #888; text-align: center; }
    .art-wearable-img {
      width: 80px; height: 50px; background: #f5f5f5;
      border: 1px solid #ddd; border-radius: 4px;
      display: flex; align-items: center; justify-content: center;
    }
    .wearable-belt-img { font-size: 7px; color: #555; text-align: center; padding: 4px; }
    .art-grid-body  { border: 1px solid #ddd; border-top: none; }
    .art-row {
      display: flex; align-items: center;
      border-bottom: 1px solid #eee; padding: 10px 0;
    }
    .art-row:last-child { border-bottom: none; }
    .art-row-name {
      width: 200px; flex-shrink: 0;
      display: flex; flex-direction: column; gap: 2px; padding-left: 12px;
    }
    .member-name  { font-size: 13px; font-weight: bold; color: #006fcf; }
    .member-card  { font-size: 11px; color: #555; }
    .art-row-cell { flex: 1; display: flex; align-items: center; justify-content: center; }
    .art-checkbox { width: 16px; height: 16px; cursor: pointer; accent-color: #1a3a6b; }
    .art-actions  { display: flex; gap: 10px; margin-top: 20px; }
    .btn-clear {
      background: #fff; color: #333; border: 1px solid #999;
      padding: 8px 22px; font-size: 13px; cursor: pointer; border-radius: 3px;
    }
    .btn-clear:hover  { background: #f5f5f5; }
    .btn-assign {
      background: #1a1a1a; color: #fff; border: 1px solid #1a1a1a;
      padding: 8px 22px; font-size: 13px; cursor: pointer; border-radius: 3px;
    }
    .btn-assign:hover { background: #333; }
  `],
})
export class CentPersonalizeComponent {

  clientId        = '';
  clientError     = '';
  clientSubmitted = false;

  cardArts: CardArt[] = [
    { id: 'classic', label: 'Classic Black Centurion',   color: '#1a1a1a' },
    { id: 'kehinde', label: 'Kehinde Wiley x Centurion', color: '#2d4a1e' },
    { id: 'rem',     label: 'Rem Koolhaas x Centurion',  color: '#2a2a3a' },
  ];

  cardMembers: CardMember[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  onClientSubmit(): void {
    this.clientError = '';
    if (!this.clientId.trim()) {
      this.clientError = 'Please enter a Client ID.';
      return;
    }

    const mockClientData: { [key: string]: CardMember[] } = {
      '20985437': [{ name: 'JOHN ANDERSON',   cardEnding: '9008', selectedArtId: 'classic', selectedWearable: true  }],
      '30174625': [{ name: 'ROBERT KING',      cardEnding: '6612', selectedArtId: 'kehinde', selectedWearable: true  }],
      '47829301': [{ name: 'SOPHIA PATEL',     cardEnding: '5590', selectedArtId: 'kehinde', selectedWearable: true  }],
      '61038472': [{ name: 'HENRY COLLINS',    cardEnding: '2284', selectedArtId: 'classic', selectedWearable: false }],
      '72641890': [{ name: 'CATHERINE MOORE',  cardEnding: '1193', selectedArtId: 'rem',     selectedWearable: false }],
    };

    const members = mockClientData[this.clientId.trim()];
    if (!members) {
      this.clientError = 'Client ID not found. Please enter a valid Client ID.';
      return;
    }

    this.clientSubmitted = true;
    this.cardMembers     = members;
  }

  onArtSelect(member: CardMember, artId: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    member.selectedArtId = checked ? artId : null;
  }

  onClearSelections(): void {
    this.cardMembers.forEach(m => { m.selectedArtId = null; m.selectedWearable = false; });
  }

  onAssignPreference(): void {
    this.router.navigate(['../confirm'], {
      relativeTo: this.route,
      state: { cardMembers: this.cardMembers, cardArts: this.cardArts },
    });
  }

  goBack(): void {
    this.router.navigate(['../home'], { relativeTo: this.route });
  }
}