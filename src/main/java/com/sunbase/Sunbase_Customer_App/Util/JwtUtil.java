package com.sunbase.Sunbase_Customer_App.Util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // // The secret key used for signing JWTs
    private Key secretKey;

    //// Token expiration time set to 1 hour (3600000 milliseconds)
    private final long expiration = 3600000; // 1 hour in milliseconds
    //
    //// Initialize the secret key after the bean is constructed
    @PostConstruct
    public void init() {
        this.secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    }

    // // Generate a JWT token for a given username
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username) //Set the subject as the username
                .setIssuedAt(new Date())  // Set the current date as the issue date
                .setExpiration(new Date(System.currentTimeMillis() + expiration))// Set the expiration date
                .signWith(secretKey) //// Sign the token with the secret key
                .compact();
    }

    //
    // Extract the username from the given JWT token
    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)  // Parse the JWT token
                .getBody()
                .getSubject();
    }

    // Validate the given JWT token

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
            return true; // If no exception is thrown, the token is valid
        } catch (JwtException | IllegalArgumentException e) {
            return false; // If an exception is thrown, the token is invalid
        }
    }
}

