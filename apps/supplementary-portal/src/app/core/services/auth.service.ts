// import { Injectable } from '@angular/core';

// @Injectable({ providedIn: 'root' })
// export class SuppAuthService {
//   private readonly TOKEN_KEY = 'mfe_token';
//   private readonly USER_KEY  = 'mfe_user';
//   getToken(): string | null { return localStorage.getItem(this.TOKEN_KEY); }
//   hasToken(): boolean       { return !!this.getToken(); }
//   getUser(): { username: string; role: string } | null {
//     const raw = localStorage.getItem(this.USER_KEY);
//     return raw ? JSON.parse(raw) : null;
//   }
// }