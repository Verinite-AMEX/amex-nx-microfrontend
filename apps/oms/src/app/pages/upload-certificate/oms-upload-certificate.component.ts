import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  AmexUploadCertificatePanelComponent
} from '@ui-components/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-upload-certificate',

  standalone: true,

  imports: [
    CommonModule,
    AmexUploadCertificatePanelComponent
  ],

  templateUrl:
    './oms-upload-certificate.component.html',
})
export class OmsUploadCertificateComponent {

  @Input()
  hintText =
    'Please upload only .pdf or .jpg files';

  @Input()
  status:
    'idle'
    | 'success'
    | 'error' = 'idle';

  @Input()
  statusMessage = '';

  @Output()
  uploadCertificateClicked =
    new EventEmitter<void>();

  @Output()
  backClicked =
    new EventEmitter<void>();

    showComponent = true;

  // FILE UPLOAD
  onUploadCertificate(
  file: File | null
) {

  console.log(
    'Selected File:',
    file
  );

  // NO FILE
  if (!file) {

    this.status = 'error';

    this.statusMessage =
      'Please select a file';

    return;
  }

  const validTypes = [

    'application/pdf',

    'image/jpeg',

    'image/jpg'
  ];

  // INVALID FILE
  if (
    !validTypes.includes(
      file.type
    )
  ) {

    this.status = 'error';

    this.statusMessage =
      'Invalid file type. Please upload a PDF.';

    return;
  }

  // SUCCESS
  setTimeout(() => {

    this.status =
      'success';

    this.statusMessage =
      'Certificate uploaded successfully.';

    console.log(
      'Upload Success'
    );

  }, 1000);
}

  // BACK
  onBack() {

    console.log(
      'Back Clicked'
    );

    this.backClicked.emit();
  }
}