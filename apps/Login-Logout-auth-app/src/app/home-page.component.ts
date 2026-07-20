import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { ButtonComponent } from '@ui-components/ui';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule,ButtonComponent ],
  template: `
    <div style="padding: 30px; font-family: Arial, sans-serif;">
      <h2>Welcome, {{ username }}</h2>
      <p>You are logged in. This page (and any micro-frontend loaded
         alongside it) shares the same auth token via localStorage.</p>
       <ui-button label="Logout" (click)="onLogout()"></ui-button>
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
