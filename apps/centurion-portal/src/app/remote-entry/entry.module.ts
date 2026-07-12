import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AmexPageComponent } from '@ui-components/ui';

import { CentHomeComponent }        from '../pages/home/cent-home.component';
import { CentLoadClientComponent }  from '../pages/load-client/cent-load-client.component';
import { CentPersonalizeComponent } from '../pages/personalize/cent-personalize.component';
import { CentConfirmComponent }     from '../pages/confirm/cent-confirm.component';

@Component({
  selector: 'cent-entry',
  standalone: false,
  template: `
    <amex-page-component
      portalStyle="onls"
      [showSidebar]="false"
      [config]="shellConfig">
      <router-outlet></router-outlet>
    </amex-page-component>
  `,
})
export class CentEntryComponent {
  shellConfig = {
    header:  { visible: false },
    footer:  { visible: false },
    sidebar: { visible: false },
  };
}

const routes: Routes = [
  {
    path: '',
    component: CentEntryComponent,
    children: [
      { path: '',            redirectTo: 'home',        pathMatch: 'full' },
      { path: 'home',        component: CentHomeComponent        },
      { path: 'load-client', component: CentLoadClientComponent  },
      { path: 'personalize', component: CentPersonalizeComponent },
      { path: 'confirm',     component: CentConfirmComponent     },
    ],
  },
];

@NgModule({
  declarations: [CentEntryComponent],
  imports: [
    CommonModule,
    AmexPageComponent,
    RouterModule.forChild(routes),
  ],
})
export class CenturionRemoteEntryModule {}