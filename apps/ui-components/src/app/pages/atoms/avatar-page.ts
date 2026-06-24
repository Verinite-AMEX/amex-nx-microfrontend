import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { AvatarComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-avatar-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, AvatarComponent],
  template: `
    <app-showcase-page title="Avatar" description="User representation with initials or image.">
      <app-variant-section title="With Initials">
        <ui-avatar initials="JD" size="sm" color="#1976d2"></ui-avatar>
        <ui-avatar initials="AB" size="md" color="#ff4081"></ui-avatar>
        <ui-avatar initials="XY" size="lg" color="#4caf50"></ui-avatar>
        <ui-avatar initials="ZZ" size="xl" color="#ff9800"></ui-avatar>
      </app-variant-section>
      <app-variant-section title="With Image">
        <ui-avatar src="https://i.pravatar.cc/150?img=1" alt="User 1" size="md"></ui-avatar>
        <ui-avatar src="https://i.pravatar.cc/150?img=2" alt="User 2" size="lg"></ui-avatar>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class AvatarPageComponent {}
