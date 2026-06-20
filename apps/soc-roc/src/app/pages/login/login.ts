import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) {}

  onLogin(): void {
    this.errorMessage = '';
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both User ID and Password.';
      return;
    }
    this.isLoading = true;
    // TODO: Replace with actual API call
    setTimeout(() => {
      if (this.username === 'admin' && this.password === 'admin123') {
        localStorage.setItem('soc_roc_token', 'mock-auth-token');
        localStorage.setItem('soc_roc_user', this.username);
        this.router.navigateByUrl('/dashboard');
      } else {
        this.errorMessage = 'Invalid User ID or Password. Please try again.';
        this.isLoading = false;
      }
    }, 600);
  }

  onCancel(): void {
    this.username = '';
    this.password = '';
    this.errorMessage = '';
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onLogin();
    }
  }
}