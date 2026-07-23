import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account, AccessGroupModel } from './../../model/account.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class UserSearch {
  accountData!: Account;

  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:8080/api/onlinehelper/accounts';
  private suppBaseUrl = 'http://localhost:8080/api/onlinehelper/supplementary';

  getAccountByUserId(userId: string): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/user/${userId}`);
  }

  getAccountByCardNo(cardNo: string): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/card/${cardNo}`);
  }

  getSupplementaryCardsByUserId(userId: string): Observable<AccessGroupModel> {
    return this.http.get<AccessGroupModel>(
      `${this.suppBaseUrl}/user/${userId}`,
    );
  }

  getSupplementaryCardsByCardNo(cardNo: string): Observable<AccessGroupModel> {
    return this.http.get<AccessGroupModel>(
      `${this.suppBaseUrl}/card/${cardNo}`,
    );
  }

  lockUser(userId: string): Observable<Account> {
    return this.http.post<Account>(`${this.baseUrl}/lock/${userId}`, {});
  }

  unlockUser(userId: string): Observable<Account> {
    return this.http.post<Account>(`${this.baseUrl}/unlock/${userId}`, {});
  }

  lockSupplementaryUser(userId: string): Observable<AccessGroupModel> {
    return this.http.post<AccessGroupModel>(
      `${this.suppBaseUrl}/lock/${userId}`,
      {},
    );
  }

  unlockSupplementaryUser(userId: string): Observable<AccessGroupModel> {
    return this.http.post<AccessGroupModel>(
      `${this.suppBaseUrl}/unlock/${userId}`,
      {},
    );
  }
}
