import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent, ButtonComponent } from '@ui-components/ui';
import { AmexPageShellComponent } from '@ui-components/ui';

@Component({
  selector: 'app-contentbox',
  standalone: true,
  imports: [CommonModule, InputComponent, ButtonComponent],
  templateUrl: './contentbox.html',
  styleUrl: './contentbox.css',
})
export class Contentbox {
  // Signals
  cardNumber = signal('');
  errorMessage = signal('');
  statementData = signal<string[]>([]);

  // Computed signal
  showStatements = computed(() => this.statementData().length > 0);

  mockData: Record<string, string[]> = {
    '374405679097005': [
      'October 2029',
      'September 2029',
      'August 2029',
      'July 2029',
      'June 2029',
      'May 2029',
      'April 2029',
      'March 2029',
      'February 2029',
      'January 2029',
      'December 2028',
      'November 2028',
    ],

    '4556123412345678': ['January 2029', 'December 2028', 'November 2028'],

    '6011000990139424': [
      'March 2030',
      'February 2030',
      'January 2030',
      'December 2029',
    ],

    '5105105105105100': ['August 2029', 'July 2029'],

    '3530111333300000': ['June 2029'],

    '4000000000000000': [],

    '4111111111111111': [
      'April 2030',
      'March 2030',
      'February 2030',
      'January 2030',
      'December 2029',
      'November 2029',
      'October 2029',
      'September 2029',
    ],
  };

  onCardInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.cardNumber.set(value);
  }

  onSubmit(): void {
    // Reset state
    this.errorMessage.set('');
    this.statementData.set([]);

    const card = this.cardNumber().trim();
    const data = this.mockData[card];

    // 1. Empty input
    if (!card) {
      this.errorMessage.set('Please enter a card number');
      return;
    }

    // 2. Invalid card
    if (data === undefined) {
      this.errorMessage.set('Invalid card number');
      return;
    }

    // 3. No statements
    if (data.length === 0) {
      this.errorMessage.set('No statements available');
      return;
    }

    // 4. Success
    this.statementData.set(data);
  }
}
