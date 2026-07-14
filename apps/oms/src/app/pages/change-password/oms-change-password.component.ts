import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

import { AmexChangePasswordFormComponent } from "@ui-components/ui";

@Component({
  selector: "oms-change-password",

  standalone: true,

  imports: [CommonModule, AmexChangePasswordFormComponent],

  templateUrl: "./oms-change-password.component.html",

  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class OmsChangePasswordComponent {
  // @Input()
  // portalStyle: 'onls' | 'oms' = 'oms';
  // @Input()
  // portalTitle =
  //   'Online Merchant Services';
  // @Input()
  // errorMessage = '';
  // @Input()
  // successMessage = '';
}
