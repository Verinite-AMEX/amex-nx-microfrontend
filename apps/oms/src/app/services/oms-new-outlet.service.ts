import {
  Injectable
} from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OmsNewOutletService {

  private STORAGE_KEY =
    'new_outlet_applications';

  private applicationsSubject =
    new BehaviorSubject<any[]>([]);

  applications$ =
    this.applicationsSubject
      .asObservable();

  constructor() {

    this.loadApplications();
  }

  private loadApplications() {

    const storedApplications =
      localStorage.getItem(
        this.STORAGE_KEY
      );

    if (storedApplications) {

      this.applicationsSubject.next(
        JSON.parse(
          storedApplications
        )
      );

    } else {

      this.applicationsSubject.next([]);
    }
  }

  private saveApplications(
    applications: any[]
  ) {

    localStorage.setItem(

      this.STORAGE_KEY,

      JSON.stringify(
        applications
      )
    );

    this.applicationsSubject.next(
      applications
    );
  }

  getApplications() {

    return this.applications$;
  }

  addApplication(
    application: any
  ) {

    const updatedApplications = [

      ...this.applicationsSubject.value,

      application
    ];

    this.saveApplications(
      updatedApplications
    );
  }
}