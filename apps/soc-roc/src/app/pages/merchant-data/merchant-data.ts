import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmexPageShellComponent } from '@ui-components/ui';
import { NumbersOnlyDirective } from '../../core/directives/numbers-only.directive';


@Component({
  selector: 'app-merchant-data',
  standalone: true,
  imports: [CommonModule, FormsModule, AmexPageShellComponent, NumbersOnlyDirective],
  templateUrl: './merchant-data.html',
  styleUrls: ['./merchant-data.css']
})
export class MerchantDataComponent {

  view: 'default' | 'add' | 'modify' = 'default';

  form = {
    seNumber:        '',
    seName:          '',
    address1:        '',
    address2:        '',
    address3:        '',
    address4:        '',
    address5:        '',
    address6:        '',
    currency:        '',
    country:         '',
    activateSE:      false,
    paymentRegister: false,
    discountRate:    ''
  };

  seInvalid = false;
  msg       = '';
  msgType: 'ok' | 'err' = 'ok';

  countries  = [
    'ALGERIA','BAHRAIN','CYPRUS','DJIBOUTI','EGYPT','EUROPE',
    'INDIA','IRAQ','JORDAN','KUWAIT','LEBANON','LIBYA',
    'MAURITANIA','MOROCCO','OMAN','PALESTINE','QATAR',
    'SAUDI ARABIA','SMT','SOMALIA','SUDAN','SYRIA',
    'TUNISIA','UAE','US','UNITED ARAB EMIRATES','YEMEN'
  ];

  currencies = [
    'USD','DZD','BHD','EGP','EUR','JOD','KWD',
    'LBP','LYD','MAD','MRU','OMR','QAR','SAR',
    'SDG','SOS','SYP','TND','AED','YER'
  ];

  goToAddNew() {
    this.view = 'add';
    this.resetForm();
    this.seInvalid = false;
    this.clearMsg();
  }

  goToModify() {
    this.view = 'modify';
    this.resetForm();
    this.seInvalid = false;
    this.clearMsg();
  }

  goBack() {
    this.view = 'default';
    this.seInvalid = false;
    this.clearMsg();
  }

  onSave() {
    if (!this.form.seNumber.trim()) {
      this.seInvalid = true;
      this.showMsg('SE Number is required.', 'err');
      return;
    }
    if (!this.form.seName.trim())   { this.showMsg('SE Name is required.', 'err'); return; }
    if (!this.form.currency)        { this.showMsg('Currency is required.', 'err'); return; }
    if (!this.form.country)         { this.showMsg('Country is required.', 'err'); return; }
    this.seInvalid = false;
    // TODO: call MerchantDataService.save()
    console.log('Save:', this.form);
    this.showMsg('Merchant saved successfully.', 'ok');
  }

  onModify() {
    if (!this.form.seNumber.trim()) {
      this.seInvalid = true;
      this.showMsg('SE Number is required.', 'err');
      return;
    }
    this.seInvalid = false;
    // TODO: call MerchantDataService.update()
    console.log('Modify:', this.form);
    this.showMsg('Merchant updated successfully.', 'ok');
  }

  resetForm() {
    this.form = {
      seNumber: '', seName: '', address1: '', address2: '',
      address3: '', address4: '', address5: '', address6: '',
      currency: '', country: '', activateSE: false,
      paymentRegister: false, discountRate: ''
    };
  }

  showMsg(m: string, t: 'ok' | 'err') { this.msg = m; this.msgType = t; }
  clearMsg() { this.msg = ''; }
}