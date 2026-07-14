import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface BusEvent {
  type: string;
  payload?: any;
}

@Injectable({ providedIn: 'root' })
export class EventBusService {

  private bus$ = new Subject<BusEvent>();

  emit(event: BusEvent): void {
    this.bus$.next(event);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('mfe-bus', { detail: event }));
    }
  }

  on(): Observable<BusEvent> {
    return this.bus$.asObservable();
  }

  on$(type: string): Observable<any> {
    return this.bus$.pipe(
      filter(e => e.type === type),
      map(e => e.payload)
    );
  }
}
