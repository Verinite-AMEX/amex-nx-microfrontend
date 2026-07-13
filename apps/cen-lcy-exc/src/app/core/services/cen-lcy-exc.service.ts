import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';
import {
  CenCustomer,
  CenExcApplicationRequest,
  CenExcApplicationResult,
} from '../models/cen-lcy-exc.models';

const MOCK_CUSTOMERS: Record<string, CenCustomer> = {
  '20510409': {
    clientId:   '20510409',
    name:       'BAHONE',
    cardNumber: '3744XXXXXXX9008',
    currency:   'Bahraini Dinar',
  },
  '20510410': {
    clientId:   '20510410',
    name:       'AL RASHID',
    cardNumber: '3782XXXXXXX0011',
    currency:   'UAE Dirham',
  },
  '20510411': {
    clientId:   '20510411',
    name:       'HASSAN',
    cardNumber: '3714XXXXXXX2233',
    currency:   'Saudi Riyal',
  },
};

const SUBMITTED_APPLICATIONS: Record<string, string> = {};

function genApplicationNo(): string {
  return 'EXC' + Date.now().toString();
}

@Injectable({ providedIn: 'root' })
export class CenLcyExcService {

  getCustomer(clientId: string): Observable<CenCustomer | null> {
    const found = MOCK_CUSTOMERS[clientId.trim()] ?? null;
    return of(found).pipe(delay(500));
  }

  getExistingApplication(clientId: string): string | null {
    return SUBMITTED_APPLICATIONS[clientId.trim()] ?? null;
  }

  submitApplication(req: CenExcApplicationRequest): Observable<CenExcApplicationResult> {
    if (!req.termsAccepted) {
      return throwError(() => new Error('Terms & Conditions must be accepted.'));
    }

    const existing = SUBMITTED_APPLICATIONS[req.clientId.trim()];
    if (existing) {
      return throwError(
        () => new Error(`Application number ${existing} has already been generated for the given client id.`)
      );
    }

    const applicationNo = genApplicationNo();
    SUBMITTED_APPLICATIONS[req.clientId.trim()] = applicationNo;

    const result: CenExcApplicationResult = {
      success:       true,
      applicationNo,
      message:       `Application ${applicationNo} has been submitted successfully`,
    };
    return of(result).pipe(delay(700));
  }
}
