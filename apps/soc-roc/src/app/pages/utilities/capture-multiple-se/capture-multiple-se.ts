import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AmexSuccessToastComponent,
  AmexErrorToastComponent
} from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-capture-multiple-se',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmexSuccessToastComponent,
    AmexErrorToastComponent
  ],
  templateUrl: './capture-multiple-se.html',
  styleUrl: './capture-multiple-se.css'
})
export class CaptureMultipleSe {
  fileName: string = '';
  sheetNo: string = '1';
  refund: boolean = false;
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
    // TODO: Replace with actual API call
    setTimeout(() => {
      this.isRefreshing = false;
      this.status = 'success';
      this.statusMessage = 'Data refreshed from Excel successfully.';
    }, 800);
  }

  onUploadToServer(): void {
    this.isUploading = true;
    this.status = 'idle';
    // TODO: Replace with actual API call
    setTimeout(() => {
      this.isUploading = false;
      this.status = 'success';
      this.statusMessage = "Multiple SE's captured and uploaded successfully.";
    }, 800);
  }
}