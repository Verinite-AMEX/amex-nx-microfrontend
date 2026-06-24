import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { FileUploadComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-file-upload-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, FileUploadComponent],
  template: `
    <app-showcase-page title="File Upload" description="Drag-and-drop or click-to-upload file input.">
      <app-variant-section title="Default">
        <div style="width:400px"><ui-file-upload hint="PNG, JPG, PDF up to 10MB"></ui-file-upload></div>
      </app-variant-section>
      <app-variant-section title="Multiple Files">
        <div style="width:400px"><ui-file-upload [multiple]="true" hint="Select multiple files"></ui-file-upload></div>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class FileUploadPageComponent {}
