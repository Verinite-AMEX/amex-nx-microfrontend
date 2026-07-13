import {
  Injectable
} from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs';

import {
  UploadCertificateData
} from '../models/upload-certificate.model';

@Injectable({
  providedIn: 'root'
})
export class OmsUploadCertificateService {

  private STORAGE_KEY =
    'oms_upload_certificate';

  private uploadSubject =
    new BehaviorSubject<
      UploadCertificateData | null
    >(null);

  upload$ =
    this.uploadSubject
      .asObservable();

  constructor() {

    this.loadData();
  }

  private loadData() {

    const storedData =
      localStorage.getItem(
        this.STORAGE_KEY
      );

    if (storedData) {

      this.uploadSubject.next(

        JSON.parse(storedData)
      );
    }
  }

  saveCertificate(
    data: UploadCertificateData
  ) {

    localStorage.setItem(

      this.STORAGE_KEY,

      JSON.stringify(data)
    );

    this.uploadSubject.next(
      data
    );

    console.log(
      'Certificate Saved'
    );
  }

  getCertificate() {

    return this.upload$;
  }

  clearCertificate() {

    localStorage.removeItem(
      this.STORAGE_KEY
    );

    this.uploadSubject.next(
      null
    );
  }
}