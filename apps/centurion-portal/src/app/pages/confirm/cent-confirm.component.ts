import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AmexBreadcrumbTrailComponent } from '@ui-components/ui';

@Component({
  selector: 'app-cent-confirm',
  standalone: true,
  imports: [CommonModule, AmexBreadcrumbTrailComponent],
  template: `
    <div class="confirm-page">

      <!-- Confirmation table -->
      <table class="confirm-table">
        <thead>
          <tr>
            <th>CARD MEMBER</th>
            <th>SELECTED CARD ART</th>
            <th>PRADA CENTURION WEARABLE
              <div class="wearable-sub">1 of 2 wearables assigned</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let member of cardMembers">
            <td class="member-cell">
              {{ member.name }} - Card Ending {{ member.cardEnding }}
            </td>
            <td class="art-cell">
              <div *ngIf="getArtLabel(member.selectedArtId)" class="selected-art">
                <div
                  class="art-thumb"
                  [style.background]="getArtColor(member.selectedArtId)">
                  <div class="art-chip"></div>
                  <div class="art-logo">AMEX</div>
                </div>
                <span>{{ getArtLabel(member.selectedArtId) }}</span>
              </div>
              <span *ngIf="!getArtLabel(member.selectedArtId)" class="none-text">—</span>
            </td>
            <td class="wearable-cell">
              <div *ngIf="member.selectedWearable" class="wearable-info">
                <div class="wearable-img-placeholder">
                  <span class="wearable-brand">PRADA×CENTURION</span>
                </div>
                <span>Prada Centurion Wearable</span>
              </div>
              <span *ngIf="!member.selectedWearable" class="none-text">—</span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Success message -->
      <div class="success-msg" *ngIf="confirmed">
        Card and wearable records have been created successfully.
      </div>

      <!-- Actions -->
      <div class="confirm-actions" *ngIf="!confirmed">
        <button class="btn-back"    (click)="goBack()">Go Back</button>
        <button class="btn-confirm" (click)="onConfirm()">Confirm</button>
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; font-size: 13px; }
    .confirm-page { padding: 20px 24px; }
    .confirm-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .confirm-table th {
      background: #e8eef5; border: 1px solid #ccd8e8;
      padding: 8px 12px; font-size: 12px; font-weight: bold;
      color: #1a3a5c; text-align: left; text-transform: uppercase;
    }
    .wearable-sub { font-size: 10px; font-weight: normal; color: #555; margin-top: 2px; }
    .confirm-table td {
      border: 1px solid #dde8f0; padding: 10px 12px;
      vertical-align: middle; background: #fff;
    }
    .member-cell { color: #006fcf; font-weight: bold; font-size: 13px; }
    .selected-art { display: flex; align-items: center; gap: 10px; }
    .art-thumb {
      width: 60px; height: 38px; border-radius: 4px;
      position: relative; display: flex;
      align-items: flex-end; justify-content: flex-end;
      padding: 4px; box-shadow: 0 1px 4px rgba(0,0,0,0.3); flex-shrink: 0;
    }
    .art-chip {
      position: absolute; top: 6px; left: 6px;
      width: 10px; height: 8px;
      background: #d4a843; border-radius: 1px; opacity: 0.8;
    }
    .art-logo { font-size: 5px; color: #fff; font-weight: bold; opacity: 0.9; }
    .none-text { color: #aaa; }
    .wearable-info { display: flex; align-items: center; gap: 10px; }
    .wearable-img-placeholder {
      width: 60px; height: 38px; background: #f5f5f5;
      border: 1px solid #ddd; border-radius: 4px;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .wearable-brand { font-size: 6px; color: #555; text-align: center; }
    .success-msg {
      background: #dff0d8; border: 1px solid #a3c98a;
      color: #3a6e28; padding: 10px 14px; font-size: 13px; margin-bottom: 16px;
    }
    .confirm-actions { display: flex; gap: 10px; }
    .btn-back, .btn-confirm {
      background: #1a1a1a; color: #fff; border: 1px solid #1a1a1a;
      padding: 8px 22px; font-size: 13px; cursor: pointer; border-radius: 3px;
    }
    .btn-back:hover, .btn-confirm:hover { background: #333; }
  `],
})
export class CentConfirmComponent implements OnInit {

  cardMembers: any[] = [];
  cardArts:    any[] = [];
  confirmed = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const state = history.state;
    this.cardMembers = state?.cardMembers || [];
    this.cardArts    = state?.cardArts    || [];
  }

  getArtLabel(artId: string | null): string {
    return this.cardArts.find((a: any) => a.id === artId)?.label || '';
  }

  getArtColor(artId: string | null): string {
    return this.cardArts.find((a: any) => a.id === artId)?.color || '#1a1a1a';
  }

  goBack(): void {
    this.router.navigate(['../personalize'], { relativeTo: this.route }); // ✅ Fixed
  }

  onConfirm(): void { this.confirmed = true; }
}