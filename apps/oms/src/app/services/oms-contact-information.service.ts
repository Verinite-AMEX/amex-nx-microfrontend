import {
  Injectable
} from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs';

import {
  ContactInformation
} from '../models/contact-information.model';

@Injectable({
  providedIn: 'root'
})
export class OmsContactInformationService {

  private STORAGE_KEY =
    'oms_contact_information';

  private contactInfoSubject =
    new BehaviorSubject<
      ContactInformation[]
    >([]);

  contactInfo$ =
    this.contactInfoSubject
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

      this.contactInfoSubject.next(

        JSON.parse(storedData)
      );

    } else {

      this.contactInfoSubject.next([]);
    }
  }

  private saveData(
    data: ContactInformation[]
  ) {

    localStorage.setItem(

      this.STORAGE_KEY,

      JSON.stringify(data)
    );

    this.contactInfoSubject.next(
      data
    );
  }

  getContactInformation() {

    return this.contactInfo$;
  }

  getBySection(
    sectionTitle: string
  ) {

    return this
      .contactInfoSubject
      .value
      .filter(
        item =>

          item.sectionTitle ===
          sectionTitle
      );
  }

  saveSectionData(
    sectionTitle: string,

    contacts: any[]
  ) {

    const remainingData =
      this.contactInfoSubject
        .value
        .filter(
          item =>

            item.sectionTitle !==
            sectionTitle
        );

    const updatedSectionData =
      contacts.map(
        contact => ({

          ...contact,

          sectionTitle
        })
      );

    const updatedData = [

      ...remainingData,

      ...updatedSectionData
    ];

    this.saveData(
      updatedData
    );

    console.log(
      `${sectionTitle} Saved`
    );
  }

  clearAll() {

    localStorage.removeItem(
      this.STORAGE_KEY
    );

    this.contactInfoSubject.next(
      []
    );
  }
}