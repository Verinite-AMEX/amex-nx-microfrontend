import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AmexPageComponent } from '@ui-components/ui';
import { authGuard } from '@amex/shared-services';
import { SuppSearchComponent } from '../pages/search/supp-search.component';

@Component({
  selector: 'supp-entry',
  standalone: false,
  template: `
    <amex-page-component
      portalStyle="onls"
      [showHeader]="false"
      [showFooter]="false"
      [showSidebar]="false">
      <router-outlet></router-outlet>
    </amex-page-component>
  `,
})
export class SuppEntryComponent {}
const routes: Routes = [
  {
    path: '',
    component: SuppEntryComponent,
    children: [
      { path: '',       redirectTo: 'search', pathMatch: 'full' },
      { path: 'search', component: SuppSearchComponent, canActivate: [authGuard] },
    ],
  },
];
@NgModule({
  declarations: [SuppEntryComponent],
  imports: [
    CommonModule,
    AmexPageComponent,
    RouterModule.forChild(routes),
  ],
})
export class SuppRemoteEntryModule {}