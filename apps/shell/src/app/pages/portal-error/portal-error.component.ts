import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-portal-error',
    template: `
    <div class="portal-error">
      <h3>&#9888; Portal Not Available</h3>
      <p>
        The <strong>{{ portalName }}</strong> remote app is not running.<br>
        The shell, authentication, and Module Federation config are working correctly.<br><br>
        <strong>Start the portal in a new terminal:</strong>
      </p>
      <div class="portal-error-cmds">
        @for (cmd of startCmds; track cmd) {
          <div class="portal-error-cmd">
            <span class="cmd-label">{{ cmd.label }}</span>
            <code>{{ cmd.command }}</code>
          </div>
        }
      </div>
      <p style="margin-top:16px;">Then refresh this page.</p>
    </div>
    `,
    standalone: false
})
export class PortalErrorComponent implements OnInit {

  portalName = 'Unknown';
  startCmds: { label: string; command: string }[] = [];

  private readonly portals: Record<string, { name: string; dir: string; port: number }> = {
    account: { name: 'Online Account Services', dir: 'online-account', port: 4201 },
    bcrb:    { name: 'BCRB Report Portal',       dir: 'bcrb-portal',    port: 4202 },
    bta:     { name: 'BTA Portal',               dir: 'bta-portal',     port: 4203 },
    offers:  { name: 'AEME Offers & Benefits',   dir: 'offers-portal',  port: 4204 },
    supp:    { name: 'Supp', dir: 'supp-portal', port: 4205},
    wearables:  { name: 'AMEX Wearables',  dir: 'wearables-portal',       port: 4206 },
    pay_with_points:   { name: 'Pay With Points', dir: 'pay-with-points-portal', port: 4207 },
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    let r = this.route;
    while (r.parent) r = r.parent;
    const segment = r.snapshot.firstChild?.url[0]?.path ?? '';
    const info = this.portals[segment];

    if (info) {
      this.portalName = info.name;
      this.startCmds  = [
        {
          label:   `${info.name} (port ${info.port}):`,
          command: `cd ${info.dir} && npm install && npx ng serve --port ${info.port}`,
        },
      ];
    } else {
      this.portalName = 'Portal';
      this.startCmds  = Object.values(this.portals).map(p => ({
        label:   `${p.name} (port ${p.port}):`,
        command: `cd ${p.dir} && npm install && npx ng serve --port ${p.port}`,
      }));
    }
  }
}
