import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmexPageShellComponent } from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-currency-master',
  standalone: true,
  imports: [CommonModule, FormsModule, AmexPageShellComponent],
  templateUrl: './currency-master.component.html',
  styleUrls: ['./currency-master.component.css']
})
export class CurrencyMaster {

  view: 'default' | 'add' | 'modify' = 'default';

  // Default view
  defaultCode = '';
  defaultName = '';
  showDefaultDrop = false;

  // Add New fields
  addCode = '';
  addName = '';
  addShortName = '';
  addDecimals = '';

  // Modify fields
  modifyCode = '';
  modifyName = '';
  modifyShortName = '';
  modifyDecimals = '';
  modifyInput = '';
  showDrop = false;
  suggestions: { name: string; code: string; shortName: string; decimals: number }[] = [];

  msg = '';
  msgType: 'ok' | 'err' = 'ok';

  currencyOptions: { name: string; code: string; shortName: string; decimals: number }[] = [
    { name: 'US DOLLAR',          code: '001', shortName: 'USD', decimals: 2 },
    { name: 'ALGERIAN DINAR',     code: '012', shortName: 'DZD', decimals: 2 },
    { name: 'BAHRAINI DINAR',     code: '048', shortName: 'BHD', decimals: 3 },
    { name: 'EGYPTIAN POUND',     code: '818', shortName: 'EGP', decimals: 2 },
    { name: 'EURO',               code: '978', shortName: 'EUR', decimals: 2 },
    { name: 'JORDANIAN DINAR',    code: '400', shortName: 'JOD', decimals: 3 },
    { name: 'KUWAITI DINAR',      code: '414', shortName: 'KWD', decimals: 3 },
    { name: 'LEBANESE POUND',     code: '422', shortName: 'LBP', decimals: 2 },
    { name: 'LIBYAN DINAR',       code: '434', shortName: 'LYD', decimals: 3 },
    { name: 'MAURITANIAN OUGUIYA',code: '478', shortName: 'MRU', decimals: 2 },
    { name: 'MOROCCAN DIRHAM',    code: '504', shortName: 'MAD', decimals: 2 },
    { name: 'OMANI RIAL',         code: '512', shortName: 'OMR', decimals: 3 },
    { name: 'QATARI RIYAL',       code: '634', shortName: 'QAR', decimals: 2 },
    { name: 'SAUDI RIYAL',        code: '682', shortName: 'SAR', decimals: 2 },
    { name: 'SOMALI SHILLING',    code: '706', shortName: 'SOS', decimals: 2 },
    { name: 'SUDANESE POUND',     code: '938', shortName: 'SDG', decimals: 2 },
    { name: 'SYRIAN POUND',       code: '760', shortName: 'SYP', decimals: 2 },
    { name: 'TUNISIAN DINAR',     code: '788', shortName: 'TND', decimals: 3 },
    { name: 'UAE DIRHAM',         code: '784', shortName: 'AED', decimals: 2 },
    { name: 'YEMENI RIAL',        code: '886', shortName: 'YER', decimals: 2 },
  ];

  // ---- Default dropdown ----
  defaultSuggestions: { name: string; code: string; shortName: string; decimals: number }[] = [];

  toggleDefaultDrop() {
    this.showDefaultDrop = !this.showDefaultDrop;
    if (this.showDefaultDrop) this.defaultSuggestions = [...this.currencyOptions];
  }

  onDefaultPick(c: { name: string; code: string; shortName: string; decimals: number }) {
    this.defaultName = c.name;
    this.defaultCode = c.code;
    this.showDefaultDrop = false;
  }

  // ---- Navigation ----
  goToAddNew() {
    this.view = 'add';
    this.addCode = '';
    this.addName = '';
    this.addShortName = '';
    this.addDecimals = '';
    this.showDefaultDrop = false;
    this.clearMsg();
  }

  goToModify() {
    this.view = 'modify';
    this.modifyCode = '';
    this.modifyName = '';
    this.modifyShortName = '';
    this.modifyDecimals = '';
    this.modifyInput = '';
    this.showDrop = false;
    this.clearMsg();
  }

  goBack() {
    this.view = 'default';
    this.clearMsg();
  }

  // ---- Add New ----
  onSave() {
    if (!this.addCode.trim())     { this.showMsg('Currency Code is required.', 'err'); return; }
    if (!this.addName.trim())     { this.showMsg('Currency Name is required.', 'err'); return; }
    if (!this.addShortName.trim()){ this.showMsg('Short Name is required.', 'err'); return; }
    if (!this.addDecimals.trim()) { this.showMsg('No. of Decimals is required.', 'err'); return; }
    console.log('Add:', { code: this.addCode, name: this.addName, shortName: this.addShortName, decimals: this.addDecimals });
    this.showMsg('Currency added successfully.', 'ok');
    this.addCode = ''; this.addName = ''; this.addShortName = ''; this.addDecimals = '';
  }

  // ---- Modify autocomplete ----
  onModifyInput(val: string) {
    this.modifyInput = val;
    this.modifyName = val;
    this.suggestions = val.trim().length === 0
      ? [...this.currencyOptions]
      : this.currencyOptions.filter(c => c.name.toLowerCase().includes(val.toLowerCase()));
    this.showDrop = true;
    const exact = this.currencyOptions.find(c => c.name.toLowerCase() === val.toLowerCase());
    if (exact) {
      this.modifyCode      = exact.code;
      this.modifyShortName = exact.shortName;
      this.modifyDecimals  = String(exact.decimals);
    } else {
      this.modifyCode = '';
      this.modifyShortName = '';
      this.modifyDecimals = '';
    }
  }

  toggleModifyDrop() {
    this.showDrop = !this.showDrop;
    if (this.showDrop) this.suggestions = [...this.currencyOptions];
  }

  onPick(c: { name: string; code: string; shortName: string; decimals: number }) {
    this.modifyInput     = c.name;
    this.modifyName      = c.name;
    this.modifyCode      = c.code;
    this.modifyShortName = c.shortName;
    this.modifyDecimals  = String(c.decimals);
    this.showDrop        = false;
  }

  onModifyUpdate() {
    if (!this.modifyName.trim()) { this.showMsg('Please select a Currency.', 'err'); return; }
    if (!this.modifyCode.trim()) { this.showMsg('Currency Code could not be resolved.', 'err'); return; }
    console.log('Modify:', { code: this.modifyCode, name: this.modifyName, shortName: this.modifyShortName, decimals: this.modifyDecimals });
    this.showMsg('Currency updated successfully.', 'ok');
  }

  showMsg(m: string, t: 'ok' | 'err') { this.msg = m; this.msgType = t; }
  clearMsg() { this.msg = ''; }
}