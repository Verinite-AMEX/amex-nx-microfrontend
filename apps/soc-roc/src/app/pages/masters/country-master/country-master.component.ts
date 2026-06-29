import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmexPageShellComponent } from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-country-master',
  standalone: true,
  imports: [CommonModule, FormsModule, AmexPageShellComponent],
  templateUrl: './country-master.component.html',
  styleUrls: ['./country-master.component.css']
})
export class CountryMaster {

  view: 'default' | 'add' | 'modify' = 'default';

  // Default view fields
  defaultCode = '';
  defaultName = '';

  // Add New fields
  addCode = '';
  addName = '';

  // Modify fields
  modifyCode = '';
  modifyName = '';
  modifyInput = '';
  showDrop = false;
  suggestions: { name: string; code: string }[] = [];

  msg = '';
  msgType: 'ok' | 'err' = 'ok';

  countryOptions: { name: string; code: string }[] = [
    { name: 'KUWAIT',               code: 'KW'  },
    { name: 'INDIA',                code: '356' },
    { name: 'EUROPE',               code: 'EU'  },
    { name: 'US',                   code: 'US'  },
    { name: 'BAHRAIN',              code: 'BH'  },
    { name: 'UNITED ARAB EMIRATES', code: 'AE'  },
    { name: 'SOMALIA',              code: 'SO'  },
    { name: 'LIBYA',                code: 'LY'  },
    { name: 'EGYPT',                code: 'EG'  },
    { name: 'LEBANON',              code: 'LB'  },
    { name: 'OMAN',                 code: 'OM'  },
    { name: 'QATAR',                code: 'QA'  },
    { name: 'SAUDI ARABIA',         code: 'SA'  },
    { name: 'JORDAN',               code: 'JO'  },
    { name: 'SYRIA',                code: 'SY'  },
    { name: 'CYPRUS',               code: 'CY'  },
    { name: 'YEMEN',                code: 'YE'  },
    { name: 'ALGERIA',              code: 'DZ'  },
    { name: 'SMT',                  code: 'SM'  },
    { name: 'TUNISIA',              code: 'TN'  },
    { name: 'MAURITANIA',           code: 'MR'  },
    { name: 'MOROCCO',              code: 'MA'  },
    { name: 'SUDAN',                code: 'SD'  },
    { name: 'IRAQ',                 code: 'IQ'  },
    { name: 'PALESTINE',            code: 'PS'  },
    { name: 'DJIBOUTI',             code: 'DJ'  },
    { name: 'COMOROS',              code: 'KM'  },
  ];

  // ---- Default view dropdown ----
  showDefaultDrop = false;
  defaultSuggestions: { name: string; code: string }[] = [];

  toggleDefaultDrop() {
    this.showDefaultDrop = !this.showDefaultDrop;
    if (this.showDefaultDrop) this.defaultSuggestions = [...this.countryOptions];
  }

  onDefaultPick(c: { name: string; code: string }) {
    this.defaultName = c.name;
    this.defaultCode = c.code;
    this.showDefaultDrop = false;
  }

  // ---- Navigation ----
  goToAddNew() {
    this.view = 'add';
    this.addCode = '';
    this.addName = '';
    this.showDefaultDrop = false;
    this.clearMsg();
  }

  goToModify() {
    this.view = 'modify';
    this.modifyCode = '';
    this.modifyName = '';
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
    if (!this.addCode.trim()) { this.showMsg('Country Code is required.', 'err'); return; }
    if (!this.addName.trim()) { this.showMsg('Country Name is required.', 'err'); return; }
    console.log('Add:', { code: this.addCode, name: this.addName });
    this.showMsg('Country added successfully.', 'ok');
    this.addCode = '';
    this.addName = '';
  }

  // ---- Modify autocomplete ----
  onModifyInput(val: string) {
    this.modifyInput = val;
    this.modifyName = val;
    this.suggestions = val.trim().length === 0
      ? [...this.countryOptions]
      : this.countryOptions.filter(c => c.name.toLowerCase().includes(val.toLowerCase()));
    this.showDrop = true;
    const exact = this.countryOptions.find(c => c.name.toLowerCase() === val.toLowerCase());
    this.modifyCode = exact ? exact.code : '';
  }

  toggleModifyDrop() {
    this.showDrop = !this.showDrop;
    if (this.showDrop) this.suggestions = [...this.countryOptions];
  }

  onPick(c: { name: string; code: string }) {
    this.modifyName  = c.name;
    this.modifyInput = c.name;
    this.modifyCode  = c.code;
    this.showDrop    = false;
  }

  onModifyUpdate() {
    if (!this.modifyName.trim()) { this.showMsg('Please select a Country.', 'err'); return; }
    if (!this.modifyCode.trim()) { this.showMsg('Country Code could not be resolved.', 'err'); return; }
    console.log('Modify:', { code: this.modifyCode, name: this.modifyName });
    this.showMsg('Country updated successfully.', 'ok');
  }

  showMsg(m: string, t: 'ok' | 'err') { this.msg = m; this.msgType = t; }
  clearMsg() { this.msg = ''; }
}