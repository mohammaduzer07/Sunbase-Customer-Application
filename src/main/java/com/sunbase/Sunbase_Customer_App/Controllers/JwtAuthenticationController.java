package com.sunbase.Sunbase_Customer_App.Controllers;

import com.sunbase.Sunbase_Customer_App.RequestAndResponse.JwtRequest;
import com.sunbase.Sunbase_Customer_App.RequestAndResponse.JwtResponse;
import com.sunbase.Sunbase_Customer_App.Services.JwtUserDetailsService;
import com.sunbase.Sunbase_Customer_App.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
@RestController
public class JwtAuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private JwtUserDetailsService userDetailsService;
    @PostMapping("/authenticate")
    public JwtResponse createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        authenticate(authenticationRequest.getUsername(),
                authenticationRequest.getPassword());
        final UserDetails userDetails =
                userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String token =
                jwtUtil.generateToken(userDetails.getUsername());
        return new JwtResponse(token);
    }
    private void authenticate(String username, String password) throws
            Exception {
        try {
            authenticationManager.authenticate(new
                    UsernamePasswordAuthenticationToken(username, password));
        } catch (AuthenticationException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}