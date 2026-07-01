package com.onlinehelper.onlinehelper.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "supp_user_details")
@Data
public class SuppUserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "detail_id")
    private Long detailId;

    @Column(name = "user_ref_id")
    private String userReference;

    @Column(name = "user_status")
    private String userStatus;

    @Column(name = "email")
    private String email;

    @Column(name = "mobile_no")
    private String mobileNo;

    @Column(name = "registration_date")
    private LocalDateTime registrationDate;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @Override
    public String toString() {
        return "SuppUserDetails{" +
                "detailId=" + detailId +
                ", userReference='" + userReference + '\'' +
                ", userStatus='" + userStatus + '\'' +
                ", email='" + email + '\'' +
                ", mobileNo='" + mobileNo + '\'' +
                ", registrationDate=" + registrationDate +
                ", lastLogin=" + lastLogin +
                '}';
    }
}