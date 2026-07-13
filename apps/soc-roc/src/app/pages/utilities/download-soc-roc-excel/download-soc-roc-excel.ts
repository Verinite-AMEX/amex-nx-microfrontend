import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AmexSuccessToastComponent,
  AmexErrorToastComponent
} from '@ui-components/ui';
import { NumbersOnlyDirective } from '../../../core/directives/numbers-only.directive';

@Component({
  selector: 'app-download-soc-roc-excel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmexSuccessToastComponent,
    AmexErrorToastComponent,
    NumbersOnlyDirective
  ],
  templateUrl: './download-soc-roc-excel.html',
  styleUrl: './download-soc-roc-excel.css'
})
export class DownloadSocRocExcel {
  seNo: string = '';
  seName: string = '';
  date: string = '';
  country: string = '';
  currency: string = '';
  grandTotal: string = '';
  refund: boolean = false;
  noOfCharges: string = '';
  socRefNo: string = '';
  sheetNo: string = '1';
  fileName: string = '';
  selectedFile: File | null = null;
  isRefreshing = false;
  isUploading = false;
  status: 'idle' | 'success' | 'error' = 'idle';
  statusMessage: string = '';
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileName = input.files[0].name;
    }
  }
  onRefreshData(): void {
    if (!this.selectedFile) {
      this.status = 'error';
      this.statusMessage = 'Please choose an Excel file first.';
      return;
    }
    this.isRefreshing = true;
    this.status = 'idle';
    setTimeout(() => {
      this.isRefreshing = false;
      this.status = 'success';
      this.statusMessage = 'Data refreshed from Excel successfully.';
    }, 800);
  }
  onUploadToServer(): void {
    this.isUploading = true;
    this.status = 'idle';
    setTimeout(() => {
      this.isUploading = false;
      this.status = 'success';
      this.statusMessage = 'Data uploaded to server successfully.';
    }, 800);
  }
}