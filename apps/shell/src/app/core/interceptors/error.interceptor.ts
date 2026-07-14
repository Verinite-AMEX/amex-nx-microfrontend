import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler,
  HttpEvent, HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { EventBusService } from '../services/event-bus.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private bus: EventBusService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.auth.logout();
        } else if (err.status === 403) {
          this.bus.emit({
            type: 'NOTIFICATION',
            payload: { type: 'error', message: 'You do not have permission to do this.' }
          });
        } else if (err.status >= 500) {
          this.bus.emit({
            type: 'NOTIFICATION',
            payload: { type: 'error', message: 'A server error occurred. Please try again.' }
          });
        }
        return throwError(() => err);
      })
    );
  }
}
