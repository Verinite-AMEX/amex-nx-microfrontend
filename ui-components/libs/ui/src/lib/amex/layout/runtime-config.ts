import {
  Injectable,
  inject,
  APP_INITIALIZER,
  Provider,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

/* ============================================================================
   RUNTIME CONFIG SERVICE
   Loads /assets/config/portal-config.json (or any URL) at app startup.
   page-shell.ts merges this with [config] input — input always wins.

   Requires HttpClientModule (NgModule) or provideHttpClient() (standalone)
   to be set up in the consuming portal's AppModule.
============================================================================ */
@Injectable({ providedIn: 'root' })
export class AmexPortalRuntimeConfigService {

  private readonly http = inject(HttpClient);

  private store: Record<string, unknown> = {};

  /** Fetches and stores config from a URL. Used by APP_INITIALIZER. */
  load(url: string): Observable<void> {
    return this.http.get<Record<string, unknown>>(url).pipe(
      tap(cfg => { this.store = cfg ?? {}; }),
      catchError(err => {
        console.warn(
          `[AmexPortalRuntime] Config load failed (${url}):`,
          err?.message ?? 'unknown error'
        );
        return of({} as Record<string, unknown>);
      }),
      map(() => undefined),
    );
  }

  /** Typed getter for a top-level key in the loaded config. */
  get<T>(key: string): T | undefined {
    return this.store[key] as T | undefined;
  }

  /** Returns the full loaded config object. */
  getAll(): Record<string, unknown> {
    return { ...this.store };
  }
}

/* ============================================================================
   PROVIDER HELPER
   Call inside AppModule.providers or bootstrapApplication providers.

   Example:
     providers: [providePortalRuntimeConfig('/assets/config/wearables.json')]
============================================================================ */
export function providePortalRuntimeConfig(
  url = '/assets/config/portal-config.json'
): Provider {
  return {
    provide: APP_INITIALIZER,
    useFactory: (cfg: AmexPortalRuntimeConfigService) => () => cfg.load(url),
    deps: [AmexPortalRuntimeConfigService],
    multi: true,
  };
}