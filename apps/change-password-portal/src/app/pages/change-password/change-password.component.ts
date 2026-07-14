import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: "app-change-password",
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: `./change-password.component.html`,
  styleUrls: [`./change-password.component.css`],
})
export class ChangePasswordComponent {
  constructor(private http: HttpClient) {}

  currentPassword = "";
  newPassword = "";
  confirmPassword = "";

  showCurrent = false;
  showNew = false;
  showConfirm = false;

  loading = false;
  successMsg = "";
  errorMsg = "";
  errors: Record<string, string> = {};

  strengthScore = 0;
  strengthLabel = "";
  strengthColor = "#ddd";

  rules = {
    len: false,
    upper: false,
    lower: false,
    num: false,
    special: false,
    diff: false,
  };

  private readonly strengthColors = [
    "#ddd",
    "#D0021B",
    "#F5A623",
    "#0ea5e9",
    "#00875A",
  ];
  private readonly strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];

  onNewPasswordChange(val: string): void {
    this.clearError("new");
    this.evaluateStrength(val);
    this.onConfirmChange();
  }

  onConfirmChange(): void {
    this.clearError("confirm");
  }

  clearError(field: string): void {
    delete this.errors[field];
    this.successMsg = "";
    this.errorMsg = "";
  }

  private evaluateStrength(val: string): void {
    this.rules = {
      len: val.length >= 8,
      upper: /[A-Z]/.test(val),
      lower: /[a-z]/.test(val),
      num: /[0-9]/.test(val),
      special: /[^A-Za-z0-9]/.test(val),
      diff: val.length > 0 && val !== this.currentPassword,
    };

    const score = [
      this.rules.len,
      this.rules.upper,
      this.rules.lower,
      this.rules.num,
      this.rules.special,
    ].filter(Boolean).length;

    this.strengthScore = score;
    this.strengthLabel = this.strengthLabels[score] || "";
    this.strengthColor = this.strengthColors[score] || "#ddd";
  }

  async handleSubmit(): Promise<void> {
    this.errors = {};
    this.successMsg = "";
    this.errorMsg = "";

    let valid = true;

    if (!this.currentPassword.trim()) {
      this.errors["current"] = "Please enter your current password.";
      valid = false;
    }
    if (!this.newPassword) {
      this.errors["new"] = "Please enter a new password.";
      valid = false;
    } else if (this.newPassword.length < 8) {
      this.errors["new"] = "Password must be at least 8 characters.";
      valid = false;
    } else if (
      this.currentPassword.trim() &&
      this.newPassword === this.currentPassword
    ) {
      this.errors["current"] =
        "Current password and new password must not be the same.";
      this.errors["new"] =
        "New password must be different from current password.";
      valid = false;
    }
    if (!this.confirmPassword) {
      this.errors["confirm"] = "Please re-enter your new password.";
      valid = false;
    } else if (this.newPassword !== this.confirmPassword) {
      this.errors["confirm"] = "Passwords do not match.";
      valid = false;
    }

    if (!valid) return;

    const token =
      localStorage.getItem("jwtToken") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("token") ||
      sessionStorage.getItem("jwtToken") ||
      sessionStorage.getItem("authToken") ||
      sessionStorage.getItem("token") ||
      "";

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    this.loading = true;

    this.http
      .post<any>(
        "http://localhost:8080/api/auth/change-password",
        {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
        },
        { headers },
      )
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.successMsg = res?.message || "Password changed successfully.";
          this.currentPassword = "";
          this.newPassword = "";
          this.confirmPassword = "";
          this.showCurrent = false;
          this.showNew = false;
          this.showConfirm = false;
          this.strengthScore = 0;
          this.rules = {
            len: false,
            upper: false,
            lower: false,
            num: false,
            special: false,
            diff: false,
          };
        },
        error: (err) => {
          this.loading = false;
          this.errorMsg =
            err?.error?.message ||
            "Failed to change password. Please try again.";
        },
      });
  }
}
