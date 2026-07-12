import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'lib-ui',
  imports: [],
  templateUrl: './ui.html',
  styleUrl: './ui.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ui {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `ui-${++Ui._idCounter}`;

}
