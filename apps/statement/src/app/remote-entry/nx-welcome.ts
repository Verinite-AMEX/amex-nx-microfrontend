import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Header } from '../components/header/header';
import { Navbar } from '../components/navbar/navbar';

import {
  AmexDashboardMenuBarComponent,
  AmexPageHeaderComponent,
} from '@ui-components/ui';
import { Contentbox } from '../components/content/contentbox';

@Component({
  selector: 'app-nx-welcome',
  imports: [
    CommonModule,
    Header,
    Navbar,
    AmexDashboardMenuBarComponent,
    Contentbox,
  ],
  templateUrl: './nx-welcome.html',
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcome {
  activeSection: any;
  changeSection($event: Event) {
    throw new Error('Method not implemented.');
  }
}
