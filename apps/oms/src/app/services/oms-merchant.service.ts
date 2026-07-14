import {
  Injectable
} from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs';

import {
  Merchant
} from '../models/merchant.model';

@Injectable({
  providedIn: 'root'
})
export class OmsMerchantService {

  private STORAGE_KEY =
    'oms_merchants';

  private merchantsSubject =
    new BehaviorSubject<
      Merchant[]
    >([]);

  merchants$ =
    this.merchantsSubject
      .asObservable();

  constructor() {

    this.loadMerchants();
  }

  private loadMerchants() {

    const storedData =
      localStorage.getItem(
        this.STORAGE_KEY
      );

    if (storedData) {

      const merchants =
        JSON.parse(
          storedData
        );

      this.merchantsSubject.next(
        merchants
      );

    } else {

      this.merchantsSubject.next([]);
    }
  }

  private saveMerchants(
    merchants: Merchant[]
  ) {

    localStorage.setItem(
      this.STORAGE_KEY,

      JSON.stringify(
        merchants
      )
    );

    this.merchantsSubject.next(
      merchants
    );
  }

  getMerchants() {

    return this.merchants$;
  }

  addMerchant(
    merchantNo: string,
    ibanLast5Digits: string
  ) {

    const currentMerchants =
      this.merchantsSubject.value;

    const alreadyExists =
      currentMerchants.find(
        merchant =>
          merchant.merchantNo ===
          merchantNo
      );

    if (alreadyExists) {

      console.log(
        'Merchant already exists'
      );

      return false;
    }

    const newMerchant = {

      merchantNo,

      ibanLast5Digits
    };

    const updatedMerchants = [

      ...currentMerchants,

      newMerchant
    ];

    this.saveMerchants(
      updatedMerchants
    );

    console.log(
      'Merchant Added'
    );

    return true;
  }

  deleteMerchant(
    merchantNo: string
  ) {

    const currentMerchants =
      this.merchantsSubject.value;

    const updatedMerchants =
      currentMerchants.filter(
        merchant =>
          merchant.merchantNo !==
          merchantNo
      );

    this.saveMerchants(
      updatedMerchants
    );

    console.log(
      'Merchant Deleted'
    );
  }

  clearMerchants() {

    localStorage.removeItem(
      this.STORAGE_KEY
    );

    this.merchantsSubject.next(
      []
    );
  }
}