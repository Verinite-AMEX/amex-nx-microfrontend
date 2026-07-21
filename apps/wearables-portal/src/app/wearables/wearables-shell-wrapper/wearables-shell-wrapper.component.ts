import {
  Component,
  Optional,
  Inject,
  OnInit,
  effect,
  Injector,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AmexPageComponent,
  AmexPortalLayoutConfig,
  AmexTabItem,
  AmexPortalHealthStatus,
  AMEX_PORTAL_AUTH_ADAPTER,
} from "@ui-components/ui";
import { EnvironmentService } from "@amex/shared-services";
import { WearablesComponent } from "../components/wearables.component";
import { WearablesAuthService } from "../../core/services/auth.service";
import { SHELL_HOSTED } from "../../core/tokens/shell.token";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-wearables-shell-wrapper",
  standalone: true,
  imports: [CommonModule, AmexPageComponent, WearablesComponent],
  providers: [
    {
      provide: AMEX_PORTAL_AUTH_ADAPTER,
      useExisting: WearablesAuthService,
    },
  ],
  templateUrl: "./wearables-shell-wrapper.component.html",
  styleUrls: ["./wearables-shell-wrapper.component.css"],
})
export class WearablesShellWrapperComponent implements OnInit {
  isShellHosted: boolean;

  constructor(
    @Optional() @Inject(SHELL_HOSTED) shellHosted: boolean,
    private readonly authService: WearablesAuthService,
    private readonly environmentService: EnvironmentService,
    private readonly injector: Injector,
  ) {
    this.isShellHosted = !!shellHosted;
  }

  ngOnInit(): void {
    effect(
      () => {
        const authed = this.authService.authenticated();
        if (!authed) {
          // Was a relative '/login' — broke standalone mode (4206 has no
          // /login route of its own). Now always goes to shell's login
          // (LOGIN_APP_URL, overridden to localhost:4200/login for this
          // app), correct in both shell-hosted and standalone.
          const returnUrl = encodeURIComponent(window.location.pathname);
          window.location.href = `${this.environmentService.getLoginAppUrl()}?returnUrl=${returnUrl}`;
        }
      },
      { injector: this.injector },
    );
  }

  get healthCheckUrl(): string {
    return this.isShellHosted
      ? ""
      : `${environment.apiGatewayUrl}/actuator/health`;
  }

  get shellConfig(): AmexPortalLayoutConfig {
    if (this.isShellHosted) {
      return {
        header: { visible: false },
        footer: { visible: false },
        sidebar: { visible: false },
      };
    }
    return {
      header: { visible: true },
      footer: {
        visible: true,
        text: "© American Express. All rights reserved.",
      },
      sidebar: { visible: true },
    };
  }

  tabs: AmexTabItem[] = [
    { id: "bta", label: "BTA" },
    { id: "account", label: "Online Account Services" },
    { id: "supp", label: "Supplementary Access Helper" },
    { id: "offers", label: "Offers" },
    { id: "benefits", label: "Benefits" },
    { id: "misc", label: "Misc" },
  ];

  miscSubItems: AmexTabItem[] = [
    { id: "pay-with-points", label: "Select & Pay With Points" },
    { id: "digital-wallet", label: "Digital Wallet" },
    { id: "wearables", label: "AMEX Wearables" },
    { id: "pin-unblock", label: "PIN Unblock" },
    { id: "sms-status", label: "SMS Status" },
    { id: "priority-pass", label: "ENROLL FOR PRIORITY PASS™" },
    { id: "valueback", label: "ValueBack" },
    { id: "pccm-ftp", label: "Pccm Ftp Sequence Number" },
  ];

  onTabClick(_id: string): void {}
  onSubClick(_id: string): void {}

  onLogout(): void {
    // AmexPageComponent already calls authAdapter.logout() internally
    // before emitting this event — the effect() above handles the redirect.
  }

  onHealthCheck(status: AmexPortalHealthStatus): void {
    if (status.status === "DOWN") {
      console.warn("[WearablesPortal] Backend health check FAILED:", status);
    }
  }
}