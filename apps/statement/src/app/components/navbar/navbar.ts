import { Component } from '@angular/core';
import { AmexDashboardMenuBarComponent } from '@ui-components/ui';

import { Contentbox } from '../content/contentbox';
import { CentralStatement } from '../centralstatement/central-statement';

@Component({
  selector: 'app-navbar',
  imports: [AmexDashboardMenuBarComponent, Contentbox, CentralStatement],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  activeSection = 'latestStatements';

  selectedTabText = 'Latest Statements';

  links = [
    { id: 'centralStatements', label: 'Central Statements' },
    { id: 'latestStatements', label: 'Latest Statements' },
    { id: 'afpStatements', label: 'AFP Statements' },
    { id: 'customerStatements', label: 'Customer Statements' },
    { id: 'statementsBeta', label: 'Statements (Beta)' },
    { id: 'centralStatementsOld', label: 'Central Statements (Old)' },
  ];

  onTabChange(tabId: string) {
    this.activeSection = tabId;

    const selectedTab = this.links.find((link) => link.id === tabId);

    this.selectedTabText = selectedTab?.label || '';
  }
}
