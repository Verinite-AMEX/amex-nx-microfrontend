import { Component } from "@angular/core";
import { NxWelcome } from "./nx-welcome";

@Component({
  standalone: true,
  selector: "app-bcrb-entry",
  imports: [NxWelcome],
  template: `<app-nx-welcome></app-nx-welcome>`,
})
export class RemoteEntry {}
