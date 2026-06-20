import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  password: string = '';
  confirmPassword: string = '';
  lastName: string = '';
  accountLockedTime: string = '';
  accountStatus: string = '';
  accountLocked: string = '';
  accountLockOutTime: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onOk(): void {
    this.errorMessage = '';

    if (!this.password || !this.confirmPassword || !this.lastName) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Password and Confirm Password do not match.';
      return;
    }

    // TODO: Replace with actual signup API call
    this.router.navigateByUrl('/login');
  }

  onCancel(): void {
    this.router.navigateByUrl('/login');
  }

  goToLogin(): void {
    this.router.navigateByUrl('/login');
  }

  goToSignUp(): void {
    // already here
  }
}