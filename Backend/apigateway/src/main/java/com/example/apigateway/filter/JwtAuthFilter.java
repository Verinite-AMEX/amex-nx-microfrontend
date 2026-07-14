package com.example.apigateway.filter;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import javax.crypto.SecretKey;
import java.util.List;

@Slf4j
@Component
public class JwtAuthFilter implements GlobalFilter, Ordered {

    @Value("${jwt.secret}")
    private String secret;

    private static final List<String> PUBLIC_PATHS = List.of(
            "/api/auth/login",
            "/api/auth/register",
            "/api/auth/refresh",
            "/api/auth/validate",
            "/api/auth/forgot-password",   // FIX: was missing
            "/actuator/health"
    );

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getURI().getPath();

        if (PUBLIC_PATHS.stream().anyMatch(path::startsWith)) {
            return chain.filter(exchange);
        }

        String token = resolveToken(exchange);

        if (token == null) {
            return reject(exchange, "Missing or malformed Authorization header/cookie");
        }

        try {
            Claims claims = Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            if (!"access".equals(claims.get("type", String.class))) {
                return reject(exchange, "Refresh token not allowed here");
            }

            String username = claims.getSubject();
            @SuppressWarnings("unchecked")
            List<String> roles = (List<String>) claims.get("roles");
            String rolesHeader = roles != null ? String.join(",", roles) : "";

            // DEBUG LOGGING
            System.out.println("=== GATEWAY JWT AUTH FILTER DEBUG ===");
            System.out.println("Path: " + path);
            System.out.println("Username: " + username);
            System.out.println("Roles from JWT: " + roles);
            System.out.println("Roles Header to forward: " + rolesHeader);
            System.out.println("=====================================");

            ServerHttpRequest mutatedRequest = exchange.getRequest().mutate()
                    .header("X-Auth-Username", username)
                    .header("X-Auth-Roles", rolesHeader)
                    .header("X-Auth-Token-Valid", "true")
                    .build();

            return chain.filter(exchange.mutate().request(mutatedRequest).build());

        } catch (ExpiredJwtException e) {
            return reject(exchange, "Token expired");
        } catch (JwtException e) {
            return reject(exchange, "Invalid token");
        }
    }

    private String resolveToken(ServerWebExchange exchange) {
        String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }

        HttpCookie cookie = exchange.getRequest().getCookies().getFirst("access_token");
        return cookie != null ? cookie.getValue() : null;
    }

    private Mono<Void> reject(ServerWebExchange exchange, String reason) {
        log.warn("JWT rejected for {}: {}", exchange.getRequest().getURI().getPath(), reason);
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        response.getHeaders().setContentType(MediaType.APPLICATION_JSON);
        String body = "{\"success\":false,\"message\":\"" + reason + "\"}";
        DataBuffer buffer = response.bufferFactory().wrap(body.getBytes());
        return response.writeWith(Mono.just(buffer));
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }

    @Override
    public int getOrder() {
        return -1;
    }
}