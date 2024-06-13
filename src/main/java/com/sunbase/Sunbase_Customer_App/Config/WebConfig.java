package com.sunbase.Sunbase_Customer_App.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {


    // Override the addCorsMappings method to configure CORS settings
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allow CORS requests to all endpoints
                .allowedOrigins("http://localhost:63342") // Allow requests from this specific origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow all headers in CORS requests
                .allowedHeaders("*")
                .allowCredentials(true); // Allow cookies and credentials to be included in CORS requests
    }
}
