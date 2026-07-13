import { Component, computed, signal } from '@angular/core';
import { InputComponent, ButtonComponent } from '@ui-components/ui';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-central-statement',
  imports: [InputComponent, ButtonComponent, CommonModule],
  templateUrl: './central-statement.html',
  styleUrl: './central-statement.css',
})
export class CentralStatement {
  // Signals
  cardNumber = signal('');
  errorMessage = signal('');
  statementData = signal<string[]>([]);

  // Computed signal
  showStatements = computed(() => this.statementData().length > 0);

  mockData: Record<string, string[]> = {
    '37440567909': [
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

    '45561234123': ['January 2029', 'December 2028', 'November 2028'],

    '60110009901': [
      'March 2030',
      'February 2030',
      'January 2030',
      'December 2029',
    ],

    '51051051051': ['August 2029', 'July 2029'],

    '35301113333': ['June 2029'],

    '40000000000': [],

    '41111111111': [
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
