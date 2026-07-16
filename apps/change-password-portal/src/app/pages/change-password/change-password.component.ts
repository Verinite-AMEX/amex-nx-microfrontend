import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpHeaders, HttpClientModule } from "@angular/common/http";
import {
  AmexChangePasswordFormComponent,
  ChangePasswordData,
} from "@ui-components/ui";

@Component({
  selector: "app-change-password",
  standalone: true,
  imports: [CommonModule, HttpClientModule, AmexChangePasswordFormComponent],
  templateUrl: `./change-password.component.html`,
  styleUrls: [`./change-password.component.css`],
})
export class ChangePasswordComponent {
  constructor(private http: HttpClient) {}

  portalStyle: "onls" | "oms" = "onls";

  loading = false;
  successMsg = "";
  errorMsg = "";

  onCancel(): void {
    this.successMsg = "";
    this.errorMsg = "";
  }

  onPasswordSubmit(data: ChangePasswordData): void {
    if (this.loading) {
      return;
    }

    this.successMsg = "";
    this.errorMsg = "";

    if (!data.currentPassword || !data.newPassword || !data.confirmPassword) {
      this.errorMsg = "All fields are required.";
      return;
    }
    if (data.newPassword.length < 8) {
      this.errorMsg = "Password must be at least 8 characters.";
      return;
    }
    if (data.newPassword === data.currentPassword) {
      this.errorMsg = "New password must be different from current password.";
      return;
    }
    if (data.newPassword !== data.confirmPassword) {
      this.errorMsg = "Passwords do not match.";
      return;
    }

   const token =
  localStorage.getItem("mfe_access_token") ||
  sessionStorage.getItem("mfe_access_token") ||
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
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        { headers },
      )
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.successMsg = res?.message || "Password changed successfully.";
           setTimeout(() => {
        window.location.reload();
      }, 1500);
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