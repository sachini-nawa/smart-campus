package com.sliit.smartcampus.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping("/me")
    public Map<String, Object> currentUser(Authentication authentication) {
        Map<String, Object> response = new HashMap<>();

        if (authentication == null || !(authentication.getPrincipal() instanceof OidcUser user)) {
            response.put("authenticated", false);
            return response;
        }

        String email = user.getEmail();
        String role = email.equalsIgnoreCase("youradminemail@gmail.com") ? "ADMIN" : "USER";

        response.put("authenticated", true);
        response.put("name", user.getFullName());
        response.put("email", email);
        response.put("picture", user.getPicture());
        response.put("role", role);

        return response;
    }
}