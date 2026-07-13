import { Injectable, NgZone, OnDestroy } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SecureFormService implements OnDestroy {

  private handlers: { event: string; fn: EventListener }[] = [];
  private active = false;

  constructor(private zone: NgZone) {}

  enable(): void {
    if (this.active) return;
    this.active = true;

    this.zone.runOutsideAngular(() => {

      const block = (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target?.tagName === 'INPUT') {
          e.preventDefault();
        }
      };

      const disableAutocomplete = (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target?.tagName === 'INPUT') {
          target.setAttribute('autocomplete', 'off');
        }
      };

      this.addListener('paste',  block);          
      this.addListener('copy',   block);          
      this.addListener('cut',    block);
      this.addListener('focus',  disableAutocomplete, true);
    });
  }

  private addListener(event: string, fn: EventListener, capture = false): void {
    document.addEventListener(event, fn, capture);
    this.handlers.push({ event, fn });
  }

  ngOnDestroy(): void {
    this.handlers.forEach(({ event, fn }) =>
      document.removeEventListener(event, fn)
    );
    this.handlers = [];
    this.active   = false;
  }
}