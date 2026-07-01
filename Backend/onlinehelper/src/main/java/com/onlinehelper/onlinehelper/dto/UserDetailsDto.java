package com.onlinehelper.onlinehelper.dto;

import lombok.Data;

@Data
public class UserDetailsDto {

    private String userStatus;
    private String email;
    private String mobileNo;
    private String registrationDate;
    private String lastLogin;
}