package com.sunbase.Sunbase_Customer_App.Services;

import com.sunbase.Sunbase_Customer_App.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
@Service
public class JwtUserDetailsService implements UserDetailsService {

    // Injecting UserRepository to interact with the database
    @Autowired
    private UserRepository userRepository;


    // Load user details by username
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Find the user by username in the database
        com.sunbase.Sunbase_Customer_App.Entities.User user = userRepository.findByUsername(username);

        // If user is not found, throw an exception
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        // Return a UserDetails object with the user's username, password, and authorities
        return new User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }

}
