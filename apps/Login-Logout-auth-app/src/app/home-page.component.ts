import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 30px; font-family: Arial, sans-serif;">
      <h2>Welcome, {{ username }}</h2>
      <p>You are logged in. This page (and any micro-frontend loaded
         alongside it) shares the same auth token via localStorage.</p>
      <button (click)="onLogout()" style="padding: 8px 16px; cursor: pointer;">
        Logout
      </button>
    </div>
  `,
})
export class HomePageComponent implements OnInit {
  username = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.username = this.auth.getUsername();
  }

  onLogout(): void {
    this.auth.logout();
  }
}
