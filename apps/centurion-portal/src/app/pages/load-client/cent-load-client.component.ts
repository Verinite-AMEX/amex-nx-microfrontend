import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cent-load-client',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cent-load-client.component.html',
  styleUrls: ['./cent-load-client.component.css'],
})
export class CentLoadClientComponent {
  errorMessage   = '';
  successMessage = '';
  selectedFile: File | null = null;
  constructor(private router: Router, private route: ActivatedRoute) {}
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file  = input.files?.[0] ?? null;
    if (file && !file.name.endsWith('.txt')) {
      this.errorMessage   = 'Please upload only .txt file';
      this.successMessage = '';
      this.selectedFile   = null;
      input.value         = '';
      return;
    }
    this.errorMessage = '';
    this.selectedFile = file;
  }
  onSubmit(): void {
    this.errorMessage   = '';
    this.successMessage = '';
    if (!this.selectedFile) { this.errorMessage = 'Please select a file.'; return; }
    if (!this.selectedFile.name.endsWith('.txt')) { this.errorMessage = 'Please upload only .txt file'; return; }
    this.successMessage = 'Client Data File Loaded Successfully.';
  }
  goBack(): void {
    this.router.navigate(['../home'], { relativeTo: this.route });
  }
}