import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionUser } from '../models/session.model';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  /**
   * Stores the authenticated user.
   */
  private readonly currentUserSubject =
    new BehaviorSubject<SessionUser | null>(null);

  /**
   * Observable for components/guards.
   */
  readonly currentUser$: Observable<SessionUser | null> =
    this.currentUserSubject.asObservable();

  /**
   * Returns current authenticated user.
   */
  getCurrentUser(): SessionUser | null {
    return this.currentUserSubject.value;
  }

  /**
   * Returns true if a user is logged in.
   */
  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  /**
   * Stores authenticated user.
   */
  setCurrentUser(user: SessionUser): void {
    this.currentUserSubject.next(user);
  }

  /**
   * Updates current user.
   */
  updateCurrentUser(user: Partial<SessionUser>): void {
    const currentUser = this.currentUserSubject.value;

    if (!currentUser) {
      return;
    }

    this.currentUserSubject.next({
      ...currentUser,
      ...user,
    });
  }

  /**
   * Returns current user roles.
   */
  getRoles(): string[] {
    return this.currentUserSubject.value?.roles ?? [];
  }

  /**
   * Returns true if current user has given role.
   */
  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  /**
   * Returns true if current user has any role.
   */
  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.getRoles().includes(role));
  }

  /**
   * Clears session after logout.
   */
  clearSession(): void {
    this.currentUserSubject.next(null);
  }
}