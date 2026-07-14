import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmexPageShellComponent } from '@ui-components/ui';
import { NumbersOnlyDirective } from '../../core/directives/numbers-only.directive';

@Component({
  selector: 'app-soc-roc-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, AmexPageShellComponent, NumbersOnlyDirective],
  templateUrl: './soc-roc-transactions.html',
  styleUrls: ['./soc-roc-transactions.css']
})
export class SocRocTransactionsComponent {
  soc = {
    seNumber:    '',
    dateDD:      '',
    dateMM:      '',
    dateYYYY:    '',
    grandTotal:  '',
    noOfCharges: '',
    socRefNo:    '',
    refund:      false,
    seName:      '',
    currency:    '',
    country:     ''
  };
  roc = {
    cardAccountNo:  '',
    dateDD:         '',
    dateMM:         '',
    dateYYYY:       '',
    approvalCode:   '',
    totalAmount:    '',
    rocRefNo:       '',
    hash:           '',
    balanceSocAmt:  '',
    rejectionCode:  ''
  };
  rocList: any[]   = [];
  showRocList      = false;
  msg              = '';
  msgType: 'ok' | 'err' = 'ok';
  rejectionCodes = ['RC01', 'RC02', 'RC03', 'RC04', 'RC05'];

  onSocModify() {
    if (!this.soc.socRefNo.trim()) {
      this.showMsg('SOC Ref No. is mandatory to modify.', 'err'); return;
    }
    console.log('SOC Modify:', this.soc);
    this.showMsg('SOC modified successfully.', 'ok');
  }
  onSocDelete() {
    if (!this.soc.socRefNo.trim()) {
      this.showMsg('SOC Ref No. is mandatory to delete.', 'err'); return;
    }
    console.log('SOC Delete:', this.soc);
    this.showMsg('SOC deleted successfully.', 'ok');
  }
  onSocPrint() {
    const html = `<html><body style="font-family:Arial,sans-serif;padding:30px;">
      <div style="text-align:right"><a href="#" onclick="window.print()">Export</a></div>
      <p style="text-align:center;margin-top:100px;">No Data Found</p>
    </body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'download.html';
    a.click();
    URL.revokeObjectURL(url);
  }
  onSocCancel() {
    this.soc = {
      seNumber: '', dateDD: '', dateMM: '', dateYYYY: '',
      grandTotal: '', noOfCharges: '', socRefNo: '', refund: false,
      seName: '', currency: '', country: ''
    };
    this.clearMsg();
  }
  onRocModify() {
    if (!this.roc.rocRefNo.trim()) {
      this.showMsg('ROC Ref No. is mandatory to modify.', 'err'); return;
    }
    console.log('ROC Modify:', this.roc);
    this.showMsg('ROC modified successfully.', 'ok');
  }
  onListRocs() {
    if (!this.roc.rocRefNo.trim()) {
      this.showMsg('ROC Ref No. is required to list ROCs.', 'err'); return;
    }
    this.rocList     = [];
    this.showRocList = true;
  }
  onRocCancel() {
    this.roc = {
      cardAccountNo: '', dateDD: '', dateMM: '', dateYYYY: '',
      approvalCode: '', totalAmount: '', rocRefNo: '',
      hash: '', balanceSocAmt: '', rejectionCode: ''
    };
    this.showRocList = false;
    this.clearMsg();
  }
  showMsg(m: string, t: 'ok' | 'err') { this.msg = m; this.msgType = t; }
  clearMsg() { this.msg = ''; }
}