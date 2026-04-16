package com.sliit.smartcampus.config;

import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> {})
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/error", "/h2-console/**", "/login**").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth -> oauth
                        .successHandler(this::oauthSuccessHandler)
                )
                .logout(logout -> logout
                        .logoutSuccessUrl("http://localhost:5173")
                );

        http.headers(headers -> headers.frameOptions(frame -> frame.disable()));

        return http.build();
    }

    private void oauthSuccessHandler(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {

        OidcUser user = (OidcUser) authentication.getPrincipal();
        String email = user.getEmail();

        String role = email.equalsIgnoreCase("yourgmail@gmail.com") ? "ADMIN" : "USER";

        response.sendRedirect("http://localhost:5173/oauth-success?email=" + email + "&role=" + role);
    }
}