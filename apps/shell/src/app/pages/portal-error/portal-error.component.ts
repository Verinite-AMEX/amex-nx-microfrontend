import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-portal-error",
  templateUrl: "./portal-error.component.html",
  styleUrls: ["./portal-error.component.css"],
})
export class PortalErrorComponent implements OnInit {
  portalName = "Unknown";

  startCmds: { label: string; command: string }[] = [];

  private readonly portals: Record<
    string,
    { name: string; dir: string; port: number }
  > = {
    account: {
      name: "Online Account Services",
      dir: "online-account",
      port: 4201,
    },
    bcrb: {
      name: "BCRB Report Portal",
      dir: "bcrb-portal",
      port: 4202,
    },
    bta: {
      name: "BTA Portal",
      dir: "bta-portal",
      port: 4203,
    },
    offers: {
      name: "AEME Offers & Benefits",
      dir: "offers-portal",
      port: 4204,
    },
    supp: {
      name: "Supplementary Access",
      dir: "supp-portal",
      port: 4205,
    },
    wearables: {
      name: "AMEX Wearables",
      dir: "wearables-portal",
      port: 4206,
    },
    pay_with_points: {
      name: "Pay With Points",
      dir: "pay-with-points-portal",
      port: 4207,
    },
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    let r = this.route;

    while (r.parent) {
      r = r.parent;
    }

    const segment = r.snapshot.firstChild?.url[0]?.path ?? "";

    const info = this.portals[segment];

    if (info) {
      this.portalName = info.name;

      this.startCmds = [
        {
          label: `${info.name} (Port ${info.port})`,
          command: `cd ${info.dir} && npm install && npx ng serve --port ${info.port}`,
        },
      ];
    } else {
      this.portalName = "Portal";

      this.startCmds = Object.values(this.portals).map((portal) => ({
        label: `${portal.name} (Port ${portal.port})`,
        command: `cd ${portal.dir} && npm install && npx ng serve --port ${portal.port}`,
      }));
    }
  }
}
