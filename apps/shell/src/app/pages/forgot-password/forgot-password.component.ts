import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  standalone: false,
})
export class ForgotPasswordComponent implements OnInit {
  error = "";

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  onSubmit(data: { userId: string; emailId: string }): void {
    this.error = "";

    this.auth.forgotPassword(data.userId, data.emailId).subscribe({
      next: () => {
        // success handled inside component
      },

      error: (err) => {
        this.error =
          err.error?.message ??
          "No account found for that User ID and Email ID.";
      },
    });
  }

  goToLogin(): void {
    this.router.navigate(["/login"]);
  }
}
