import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class Dashboard {
  activeTab: string = 'main';

  constructor(private router: Router) {}

  setTab(tab: string): void {
    this.activeTab = tab;
  }

  onSelectWinners(): void {
    this.router.navigateByUrl('/soc-roc-transactions');
  }

  onUploadFile(): void {
    this.router.navigateByUrl('/utilities/file-formation-upload');
  }
}