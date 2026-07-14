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
  templateUrl: './cent-personalize.component.html',
  styleUrls: ['./cent-personalize.component.css'],
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