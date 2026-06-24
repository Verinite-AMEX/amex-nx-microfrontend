import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-ui-styles',
  imports: [],
  templateUrl: './ui-styles.html',
  styleUrl: './ui-styles.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiStyles {}
