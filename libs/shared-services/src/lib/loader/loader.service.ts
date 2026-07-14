import {
  Injectable,
  computed,
  signal,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {


  private readonly activeRequests = signal(0);

  readonly isLoading = computed(
    () => this.activeRequests() > 0);

  /**
   * Starts loader.
   */
  show(): void {
    this.activeRequests.update(
      count => count + 1
    );
  }

  /**
   * Stops loader.
   */
  hide(): void {
    this.activeRequests.update(
      count => Math.max(0, count - 1)
    );
  }

  /**
   * Clears all pending requests.
   * Useful after logout.
   */
  reset(): void {
    this.activeRequests.set(0);
  }

  /**
   * Returns active request count.
   */
  getActiveRequestCount(): number {
    return this.activeRequests();
  }

}