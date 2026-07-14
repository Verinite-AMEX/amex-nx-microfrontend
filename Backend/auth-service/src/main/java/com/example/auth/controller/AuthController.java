package com.example.auth.controller;

import com.example.auth.dto.ApiResponse;
import com.example.auth.dto.AuthDtos.*;
import com.example.auth.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Object>> register(
            @Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Registration successful", response));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        ResponseCookie accessCookie = buildAuthCookie(
                "access_token", response.getAccessToken(), response.getExpiresIn() / 1000);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, accessCookie.toString())
                .body(ApiResponse.success("Login successful", response));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refresh(
            @Valid @RequestBody RefreshRequest request) {
        AuthResponse response = authService.refresh(request);
        ResponseCookie accessCookie = buildAuthCookie(
                "access_token", response.getAccessToken(), response.getExpiresIn() / 1000);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, accessCookie.toString())
                .body(ApiResponse.success("Token refreshed", response));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout() {
        // JwtAuthenticationFilter already resolved the token (Authorization header
        // OR the access_token cookie) and populated the SecurityContext — reuse
        // that instead of re-parsing the header, so cookie-only clients work too.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Missing token"));
        }
        String username = authentication.getName();
        authService.logout(username);
        ResponseCookie expiredCookie = buildAuthCookie("access_token", "", 0);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, expiredCookie.toString())
                .body(ApiResponse.success("Logged out successfully", null));
    }

    /**
     * Internal endpoint — called by the API Gateway to validate incoming tokens.
     */
    @GetMapping("/validate")
    public ResponseEntity<TokenValidationResponse> validate(
            @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;
        TokenValidationResponse response = authService.validateToken(token);
        return response.isValid()
                ? ResponseEntity.ok(response)
                : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    /**
     * Returns the currently logged-in user's profile using the
     * HTTP-only "access_token" cookie (resolved by JwtAuthenticationFilter,
     * same as /logout). Called by the frontend on app bootstrap to
     * hydrate SessionService after a cross-origin redirect from
     * Login-Logout-auth-app, since localStorage doesn't carry over
     * across origins.
     */
    @GetMapping("/session")
    public ResponseEntity<ApiResponse<CurrentUserResponse>> me() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Not authenticated"));
        }
        String username = authentication.getName();
        CurrentUserResponse response = authService.getCurrentUser(username);
        return ResponseEntity.ok(ApiResponse.success("Current user", response));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {
        authService.forgotPassword(request);
        return ResponseEntity.ok(ApiResponse.success("Temporary password sent to your email", null));
    }

    /**
     * Admin-only: assign a specific AEME role to any user.
     * Only SYS_ADMIN can call this.
     */
    @PostMapping("/admin/assign-role")
    @PreAuthorize("hasRole('SYS_ADMIN')")
    public ResponseEntity<ApiResponse<Void>> assignRole(
            @Valid @RequestBody AssignRoleRequest request) {
        authService.assignRole(request);
        return ResponseEntity.ok(ApiResponse.success("Role assigned successfully", null));
    }

    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            HttpServletRequest request,
            @Valid @RequestBody ChangePasswordRequest body) {

        String authHeader = request.getHeader("Authorization");
        authService.changePassword(authHeader, body);
        return ResponseEntity.ok(ApiResponse.success("Password changed successfully", null));
    }

    /**
     * Builds the HTTP-only auth cookie shared by login/refresh/logout.
     * secure(false) here for local http://localhost dev — MUST be true once
     * served over HTTPS (UAT/Prod), otherwise browsers will drop the cookie.
     * sameSite("Lax") allows the cookie on top-level redirect navigations
     * between portals (needed for the bta-portal <-> Login-Logout-auth-app
     * redirect flow) while still blocking it on cross-site requests.
     */
    private ResponseCookie buildAuthCookie(String name, String value, long maxAgeSeconds) {
        return ResponseCookie.from(name, value)
                .httpOnly(true)
                .secure(false) // TODO: set true for UAT/Prod (HTTPS)
                .sameSite("Lax")
                .path("/")
                .maxAge(maxAgeSeconds)
                .build();
    }
}