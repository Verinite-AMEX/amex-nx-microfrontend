import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AmexSuccessToastComponent,
  AmexErrorToastComponent
} from '@vn-core-ui-components/ui';

interface RetField {
  label: string;
  type: 'text' | 'select';
  enabled: boolean;
  value: string;
  options?: string[];
}

interface DateFilter {
  label: string;
  enabled: boolean;
  value: string;
  placeholder?: string;
}

interface ReportRecord {
  julianDay: string;
  batchNo: string;
  socRefNo: string;
  country: string;
  currency: string;
  seNo: string;
  cardNo: string;
  rocRef: string;
  date: string;
  amount: number;
}

@Component({
  selector: 'app-retrieval',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmexSuccessToastComponent,
    AmexErrorToastComponent
  ],
  templateUrl: './retrieval.html',
  styleUrl: './retrieval.css'
})
export class Retrieval {
  selectedType: 'ROC' | 'SOC' = 'ROC';
  showModal = false;
  status: 'idle' | 'success' | 'error' = 'idle';
  statusMessage = '';
  reportRecords: ReportRecord[] = [];

  rocFields: RetField[] = [
    { label: 'Julian Day',    type: 'text',   enabled: false, value: '' },
    { label: 'Batch No.',     type: 'text',   enabled: false, value: '' },
    { label: 'SOC Ref. No.',  type: 'text',   enabled: false, value: '' },
    { label: 'Country',       type: 'select', enabled: false, value: '', options: ['US', 'AE', 'EG', 'SA'] },
    { label: 'Currency',      type: 'select', enabled: false, value: '', options: ['USD', 'AED', 'EGP', 'SAR'] },
    { label: 'SE No.',        type: 'text',   enabled: false, value: '' },
    { label: 'Card No.',      type: 'text',   enabled: false, value: '' },
    { label: 'ROC Ref.',      type: 'text',   enabled: false, value: '' },
  ];

  socFields: RetField[] = [
    { label: 'SOC Amount',    type: 'text', enabled: false, value: '' },
    { label: 'SOC No.',       type: 'text', enabled: false, value: '' },
  ];

  dateFilters: DateFilter[] = [
    { label: 'From Julian Date', enabled: false, value: '', placeholder: 'DD/MM/YYYY' },
    { label: 'To Julian Date',   enabled: false, value: '', placeholder: 'DD/MM/YYYY' },
    { label: 'From Date', enabled: false, value: '', placeholder: 'DD/MM/YYYY' },
    { label: 'To Date',   enabled: false, value: '', placeholder: 'DD/MM/YYYY' },
  ];

  onRetrieve(): void {
    // TODO: Replace with actual API call
    this.reportRecords = [];
    this.showModal = true;
  }

  onPrint(): void {
    this.showModal = true;
  }

  onPrintReport(): void {
    window.print();
  }

  onCancel(): void {
    this.showModal = false;
  }
}