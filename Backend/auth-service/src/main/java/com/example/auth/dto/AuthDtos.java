package com.example.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

public class AuthDtos {

    @Data
    public static class RegisterRequest {
        @NotNull
        @Size(min = 3, max = 50)
        private String username;

        @NotBlank
        @Email
        private String email;

        @NotNull
        @Size(min = 8, max = 100)
        private String password;

        @NotBlank
        @Size(max = 100)
        private String fullName;
        // Role is intentionally removed from public registration.
        // All new users start as ROLE_VIEWER.
        // A SYS_ADMIN must call POST /api/auth/admin/assign-role to elevate them.
    }

    @Data
    public static class LoginRequest {
        @NotBlank
        private String username;

        @NotBlank
        private String password;
    }

    @Data
    public static class RefreshRequest {
        @NotBlank
        private String refreshToken;
    }

    @Data
    public static class AssignRoleRequest {
        @NotBlank
        private String userId;

        @NotBlank
        private String role; // must be one of Roles.ALL
    }

    @Builder
    @Data
    public static class AuthResponse {
        private String userId;
        private String username;
        private String email;
        private String fullName;
        private String avatarInitials;
        private String accessToken;
        private String refreshToken;
        private String tokenType;
        private long expiresIn;
        private List<String> roles;
    }

    @Data
    public static class TokenValidationResponse {
        private boolean valid;
        private String userId;
        private String username;
        private List<String> roles;

        public TokenValidationResponse(boolean valid, String userId, String username, List<String> roles) {
            this.valid    = valid;
            this.userId   = userId;
            this.username = username;
            this.roles    = roles;
        }

        public static TokenValidationResponse invalid() {
            return new TokenValidationResponse(false, null, null, null);
        }
    }

    @Data
    public static class ForgotPasswordRequest {
        @NotBlank
        private String username;

        @NotBlank
        @Email
        private String email;
    }

    @Data
    public static class ChangePasswordRequest {
        @NotBlank
        private String currentPassword;

        @NotNull
        @Size(min = 8, max = 100)
        private String newPassword;

    }

    @Data
    @AllArgsConstructor
    public static class CurrentUserResponse {
        private String userId;
        private String username;
        private String email;
        private String fullName;
        private String avatarInitials;
        private List<String> roles;
    }
}