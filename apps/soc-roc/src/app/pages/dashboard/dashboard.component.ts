import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class Dashboard {
  activeTab: string = 'main';

  constructor(private router: Router) {}

  setTab(tab: string): void {
    this.activeTab = tab;
  }

  onSelectWinners(): void {
    this.router.navigate(['soc-roc-transactions/soc-roc-transactions']);
  }

  onUploadFile(): void {
    this.router.navigate(['utilities/file-formation-upload']);
  }
}