import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'lib-ui-styles',
  imports: [],
  templateUrl: './ui-styles.html',
  styleUrl: './ui-styles.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiStyles {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `ui-styles-${++UiStyles._idCounter}`;
}
