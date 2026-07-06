package com.example.auth.service;

import com.example.auth.dto.AuthDtos.*;
import com.example.auth.model.RefreshToken;
import com.example.auth.model.User;
import com.example.auth.repository.RefreshTokenRepository;
import com.example.auth.repository.UserRepository;
import com.example.auth.util.JwtUtil;
import com.example.auth.util.Roles;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    @Value("${jwt.expiration:86400000}")
    private long expiration;

    @Value("${jwt.refresh-expiration:604800000}")
    private long refreshExpiration;

    @Transactional
    public AuthResponse  register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username already taken: " + request.getUsername());
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered: " + request.getEmail());
        }

        String initials = deriveInitials(request.getFullName());

        // Public registration always gets VIEWER — SYS_ADMIN assigns real roles
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .avatarInitials(initials)
                .roles(Set.of("ROLE_VIEWER"))
                .build();

        userRepository.save(user);
        log.info("Registered new user: {} with role: ROLE_VIEWER", user.getUsername());

        return AuthResponse.builder()
                .userId(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .avatarInitials(user.getAvatarInitials())
                .roles(user.getRoles().stream().toList())
                .build();
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        User user = userRepository.findByUsername(request.getUsername())
                .orElseGet(() -> {
                    log.info("Auto-provisioning LDAP user into database: {}", request.getUsername());
                    User newUser = User.builder()
                            .username(request.getUsername())
                            .email(request.getUsername() + "@aeme.com")
                            .password(passwordEncoder.encode(request.getPassword()))
                            .fullName(request.getUsername().toUpperCase())
                            .avatarInitials(deriveInitials(request.getUsername()))
                            .roles(Set.of("ROLE_VIEWER"))
                            .build();
                    return userRepository.save(newUser);
                });

        refreshTokenRepository.revokeAllUserTokens(user);
        return generateAuthResponse(user);
    }

    @Transactional
    public AuthResponse refresh(RefreshRequest request) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(request.getRefreshToken())
                .orElseThrow(() -> new IllegalArgumentException("Refresh token not found"));

        if (refreshToken.isRevoked() || refreshToken.isExpired()) {
            throw new IllegalArgumentException("Refresh token is expired or revoked");
        }

        refreshToken.setRevoked(true);
        refreshTokenRepository.save(refreshToken);
        return generateAuthResponse(refreshToken.getUser());
    }

    @Transactional
    public void logout(String username) {
        userRepository.findByUsername(username).ifPresent(user -> {
            refreshTokenRepository.revokeAllUserTokens(user);
            log.info("Logged out user: {}", username);
        });
    }

    @Transactional
    public void forgotPassword(ForgotPasswordRequest request) {
        User user = userRepository.findByUsernameAndEmail(request.getUsername(), request.getEmail())
                .orElseThrow(() -> new RuntimeException("No account found with that username and email"));

        String tempPassword = java.util.UUID.randomUUID().toString().substring(0, 8);
        user.setPassword(passwordEncoder.encode(tempPassword));
        userRepository.save(user);

        refreshTokenRepository.revokeAllUserTokens(user);
        emailService.sendForgotPasswordMail(user.getEmail(), user.getUsername(), tempPassword);
        log.info("Sent forgot-password email to: {}", user.getEmail());
    }

    @Transactional
    public void assignRole(AssignRoleRequest request) {
        if (!Roles.ALL.contains(request.getRole())) {
            throw new IllegalArgumentException(
                    "Unknown role: " + request.getRole() + ". Valid roles: " + Roles.ALL);
        }

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + request.getUserId()));

        user.getRoles().add(request.getRole());
        // Remove ROLE_VIEWER if a real role is assigned
        if (!request.getRole().equals("ROLE_VIEWER")) {
            user.getRoles().remove("ROLE_VIEWER");
        }

        userRepository.save(user);
        log.info("Admin assigned role {} to user {}", request.getRole(), user.getUsername());
    }

    public TokenValidationResponse validateToken(String token) {
        try {
            if (!jwtUtil.isTokenValid(token) || !jwtUtil.isAccessToken(token)) {
                return TokenValidationResponse.invalid();
            }
            String username  = jwtUtil.extractUsername(token);
            List<String> roles = jwtUtil.extractRoles(token);

            User user = userRepository.findByUsername(username).orElse(null);
            if (user == null) return TokenValidationResponse.invalid();

            return new TokenValidationResponse(true, user.getId(), username,
                    roles != null ? roles : new ArrayList<>());
        } catch (Exception e) {
            log.warn("Token validation failed: {}", e.getMessage());
            return TokenValidationResponse.invalid();
        }
    }

    private AuthResponse generateAuthResponse(User user) {
        List<String> roles    = user.getRoles().stream().toList();
        String accessToken    = jwtUtil.generateToken(user.getUsername(), roles);
        String refreshTokenValue = jwtUtil.generateRefreshToken(user.getUsername());

        RefreshToken refreshToken = RefreshToken.builder()
                .token(refreshTokenValue)
                .user(user)
                .expiryDate(Instant.now().plusMillis(refreshExpiration))
                .build();
        refreshTokenRepository.save(refreshToken);

        return AuthResponse.builder()
                .userId(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .avatarInitials(user.getAvatarInitials())
                .accessToken(accessToken)
                .refreshToken(refreshTokenValue)
                .tokenType("Bearer")
                .expiresIn(expiration / 1000)   // FIX: was hardcoded 86400
                .roles(roles)
                .build();
    }

    private String deriveInitials(String fullName) {
        if (fullName == null || fullName.isBlank()) return "??";
        String[] parts = fullName.trim().split("\\s+");
        if (parts.length == 1) return parts[0].substring(0, Math.min(2, parts[0].length())).toUpperCase();
        return (parts[0].charAt(0) + "" + parts[parts.length - 1].charAt(0)).toUpperCase();
    }

    public String extractUsernameFromToken(String token) {
        return jwtUtil.extractUsername(token);
    }

    @Transactional
    public void changePassword(String authHeader, ChangePasswordRequest request) {

        // STEP 1: Extract username from JWT token in Authorization header
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Missing or invalid Authorization header");
        }
        String token    = authHeader.substring(7);
        String username = jwtUtil.extractUsername(token);

        // STEP 2: Load user from database
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        // STEP 3: Verify current password matches what is stored in DB
        // passwordEncoder.matches(rawPassword, encodedPassword)
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        // STEP 5: Ensure new password is different from current
        if (passwordEncoder.matches(request.getNewPassword(), user.getPassword())) {
            throw new IllegalArgumentException("New password must be different from the current password");
        }

        // STEP 6: Hash and save the new password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        // STEP 7: Revoke all refresh tokens — force re-login after password change
        refreshTokenRepository.revokeAllUserTokens(user);

        log.info("Password changed successfully for user: {}", username);
    }
}