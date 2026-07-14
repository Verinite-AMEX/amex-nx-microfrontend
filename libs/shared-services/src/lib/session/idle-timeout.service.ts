import {
  Injectable,
  NgZone,
  inject,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdleTimeoutService {

  /**
   * Default idle timeout (15 minutes).
   */
  private timeoutMs = 15 * 60 * 1000;

  /**
   * Timer reference.
   */
  private timerId: ReturnType<typeof setTimeout> | null = null;

  /**
   * Whether monitoring is active.
   */
  private running = false;

  /**
   * Timeout callback.
   */
  private onTimeout: (() => void) | null = null;

  /**
   * User activity events.
   */
  private readonly events = [
    'click',
    'keydown',
    'mousemove',
    'mousedown',
    'touchstart',
    'scroll',
  ] as const;

  private readonly zone = inject(NgZone);

  /**
   * Starts idle monitoring.
   */
  start(
    onTimeout: () => void,
    timeoutMs = 15 * 60 * 1000
  ): void {

    this.stop();

    this.timeoutMs = timeoutMs;

    this.onTimeout = onTimeout;

    this.running = true;

    this.zone.runOutsideAngular(() => {

      this.events.forEach(event =>
        document.addEventListener(
          event,
          this.resetTimer
        )
      );

      this.reset();

    });

  }

  /**
   * Stops idle monitoring.
   */
  stop(): void {

    if (!this.running) {
      return;
    }

    this.running = false;

    this.events.forEach(event =>
      document.removeEventListener(
        event,
        this.resetTimer
      )
    );

    if (this.timerId) {

      clearTimeout(this.timerId);

      this.timerId = null;

    }

  }

  /**
   * Restarts idle timer.
   */
  reset(): void {

    if (!this.running) {
      return;
    }

    if (this.timerId) {
      clearTimeout(this.timerId);
    }

    this.timerId = setTimeout(() => {

      this.zone.run(() => {

        this.onTimeout?.();

      });

    }, this.timeoutMs);

  }

  /**
   * Returns current timeout.
   */
  getTimeout(): number {
    return this.timeoutMs;
  }

  /**
   * Returns monitoring status.
   */
  isRunning(): boolean {
    return this.running;
  }

  /**
   * Bound event listener.
   */
  private readonly resetTimer = (): void => {
    this.reset();
  };

}