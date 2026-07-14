import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';
import {
  LoungeCustomer,
  PriorityPassEnrollRequest,
  PriorityPassEnrollResult,
} from '../models/lounge.models'

const MOCK_CUSTOMERS: Record<string, LoungeCustomer> = {
  'C123456': {
    clientCode: 'C123456',
    name:       'John Michael',
    mobile:     '+971 50 123 4567',
    email:      'john.michael@company.ae',
    cards: [
      {
        cardNumber:   '3782 822463 10005',
        cardType:     'The American Express® Corporate Card',
        variant:      'BULLET P',
        enrolled:     true,
        entitlements: [
          '4 complimentary lounge visits per year',
          'Access to 1,300+ airport lounges worldwide via Priority Pass™',
          'Companion access at USD 32 per visit after complimentary allowance',
        ],
        selected: false,
      },
      {
        cardNumber:   '3782 822463 10005',
        cardType:     'The American Express® Corporate Card',
        variant:      'BULLET P',
        enrolled:     false,
        entitlements: [
          '4 complimentary lounge visits per year',
          'Access to 1,300+ airport lounges worldwide via Priority Pass™',
          'Companion access at USD 32 per visit after complimentary allowance',
        ],
        selected: false,
      },
      {
        cardNumber:   '3714 496353 98431',
        cardType:     'The American Express® Gold Corporate Card',
        variant:      'BULLET G',
        enrolled:     true,
        entitlements: [
          '8 complimentary lounge visits per year',
          'Access to 1,300+ airport lounges worldwide via Priority Pass™',
          'Companion access at USD 27 per visit after complimentary allowance',
        ],
        selected: false,
      },
      {
        cardNumber:   '3714 496353 98431',
        cardType:     'The American Express® Gold Corporate Card',
        variant:      'BULLET G',
        enrolled:     false,
        entitlements: [
          '8 complimentary lounge visits per year',
          'Access to 1,300+ airport lounges worldwide via Priority Pass™',
          'Companion access at USD 27 per visit after complimentary allowance',
        ],
        selected: false,
      },
    ],
  },
  'C999999': {
    clientCode: 'C999999',
    name:       'Sara Al Rashid',
    mobile:     '+971 55 987 6543',
    email:      'sara.alrashid@corp.ae',
    cards: [],
  },
};

@Injectable({ providedIn: 'root' })
export class LoungeService {
  searchCustomer(clientCode: string): Observable<LoungeCustomer | null> {
    const found = MOCK_CUSTOMERS[clientCode.trim().toUpperCase()] ?? null;
    // Simulate network latency
    return of(found).pipe(delay(600));
  }

  enrollPriorityPass(req: PriorityPassEnrollRequest): Observable<PriorityPassEnrollResult> {
    if (!req.termsAccepted) {
      return throwError(() => new Error('Terms & Conditions must be accepted.'));
    }
    if (!req.selectedCards.length) {
      return throwError(() => new Error('At least one card must be selected.'));
    }
    
    const result: PriorityPassEnrollResult = {
      success:     true,
      message:     'Priority Pass™ enrollment submitted successfully.',
      referenceId: `PP-${Date.now()}`,
    };
    return of(result).pipe(delay(800));
  }
}
