import { Component } from '@angular/core';
import { NxWelcome } from './nx-welcome';
import { Router } from '@angular/router';

@Component({
  imports: [NxWelcome],
  selector: 'app-oms-entry',
  template: `<app-nx-welcome></app-nx-welcome>`,
})
export class RemoteEntry {

  constructor(
  private router: Router
) {}

// onTabChanged(
//   tabId: string
// ) {

//   this.router.navigate([
//     '/oms',
//     tabId
//   ]);
// }
}
