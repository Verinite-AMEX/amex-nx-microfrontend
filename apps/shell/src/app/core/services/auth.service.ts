// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { BehaviorSubject, Observable, tap } from 'rxjs';
// import { map } from 'rxjs/operators';

// export interface AuthData {
//   userId:         string;
//   username:       string;
//   email:          string;
//   fullName:       string;
//   avatarInitials: string;
//   accessToken:    string;
//   refreshToken:   string;
//   tokenType:      string;
//   expiresIn:      number;
//   roles:          string[];
// }

// export interface ApiResponse<T> {
//   success: boolean;
//   message: string;
//   data:    T;
// }

// export type AuthApiResponse = ApiResponse<AuthData>;

// export interface CurrentUser {
//   userId:   string;
//   username: string;
//   roles:    string[];
// }

// export interface LoginRequest    { username: string; password: string; }
// export interface RegisterRequest { username: string; password: string; email: string; fullName: string; }

// @Injectable({ providedIn: 'root' })
// export class AuthService {

//   private readonly AUTH_API = 'http://localhost:8080/api/auth';
//   static readonly TOKEN_KEY   = 'mfe_access_token';
//   static readonly REFRESH_KEY = 'mfe_refresh_token';
//   static readonly USER_KEY    = 'mfe_user';

//   private loggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

//   constructor(private http: HttpClient, private router: Router) {}

//   login(credentials: LoginRequest): Observable<AuthData> {
//     return this.http
//       .post<AuthApiResponse>(`${this.AUTH_API}/login`, credentials)
//       .pipe(
//         tap(res => this.storeSession(res.data)),
//         map(res => res.data)
//       );
//   }

//   register(payload: RegisterRequest): Observable<AuthData> {
//     return this.http
//       .post<AuthApiResponse>(`${this.AUTH_API}/register`, payload)
//       .pipe(
//         tap(res => this.storeSession(res.data)),
//         map(res => res.data)
//       );
//   }

//     forgotPassword(userId: string, emailId: string): Observable<any> {

//       return this.http.post(
//         `${this.AUTH_API}/forgot-password`,
//         {
//           username: userId,
//           email: emailId,
//         }
//       );
//     }

// logout(): void {
//   const token = this.getToken();

//   if (token) {
//     this.http
//       .post(
//         `${this.AUTH_API}/logout`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .subscribe({
//         next:  () => this.clearSession(),
//         error: () => this.clearSession(),
//       });
//   } else {
//     this.clearSession();
//   }
// }

// private clearSession(): void {
//   localStorage.removeItem(AuthService.TOKEN_KEY);
//   localStorage.removeItem(AuthService.REFRESH_KEY);
//   localStorage.removeItem(AuthService.USER_KEY);
//   this.loggedIn$.next(false);
//   this.router.navigate(['/login']);
// }

//   getToken(): string | null         { return localStorage.getItem(AuthService.TOKEN_KEY); }
//   hasToken(): boolean               { return !!this.getToken(); }
//   isLoggedIn(): Observable<boolean> { return this.loggedIn$.asObservable(); }

//   getUser(): CurrentUser | null {
//     const raw = localStorage.getItem(AuthService.USER_KEY);
//     try   { return raw ? JSON.parse(raw) : null; }
//     catch { return null; }
//   }

//   private storeSession(data: AuthData): void {
//     localStorage.setItem(AuthService.TOKEN_KEY,   data.accessToken);
//     localStorage.setItem(AuthService.REFRESH_KEY, data.refreshToken);
//     localStorage.setItem(AuthService.USER_KEY, JSON.stringify({
//       userId:   data.userId,
//       username: data.username,
//       roles:    data.roles,
//     }));
//     this.loggedIn$.next(true);
//   }
// }