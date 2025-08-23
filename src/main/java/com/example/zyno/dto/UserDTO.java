package com.example.zyno.dto;

import lombok.Data;

@Data
public class UserDTO {
    private String userId;
    private String name;
    private String email;
    private String mobileNumber;
    private String address;
    private String password;
    private String confirmPassword;
    private String role;
}