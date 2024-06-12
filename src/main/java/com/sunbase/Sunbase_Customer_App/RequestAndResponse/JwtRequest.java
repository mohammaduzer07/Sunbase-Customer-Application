package com.sunbase.Sunbase_Customer_App.RequestAndResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class JwtRequest {

    private String username;
    private String password;
}
