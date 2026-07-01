package com.onlinehelper.onlinehelper.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_details")
@NoArgsConstructor
@AllArgsConstructor
public class UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "User ID is required")
    @Column(unique = true)
    private String userId;

    private String userStatus = "Active";

    private String cardNo="NA";

    private String email = "NA";

    private String mobileNo = "NA";

    private String powerCardId;

    private String accountStatus = "Unlocked";

    private LocalDateTime registrationDate;

    private LocalDateTime lastLogin;

    private String siteSeal;

    // Secret Questions & Answers
    private String secretQuestion1;
    private String secretAnswer1;
    private String secretQuestion2;
    private String secretAnswer2;
    private String secretQuestion3;
    private String secretAnswer3;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserStatus() {
        return userStatus;
    }

    public void setUserStatus(String userStatus) {
        this.userStatus = userStatus;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    public String getPowerCardId() {
        return powerCardId;
    }

    public void setPowerCardId(String powerCardId) {
        this.powerCardId = powerCardId;
    }

    public String getAccountStatus() {
        return accountStatus;
    }

    public void setAccountStatus(String accountStatus) {
        this.accountStatus = accountStatus;
    }

    public LocalDateTime getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(LocalDateTime registrationDate) {
        this.registrationDate = registrationDate;
    }

    public LocalDateTime getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(LocalDateTime lastLogin) {
        this.lastLogin = lastLogin;
    }

    public String getSiteSeal() {
        return siteSeal;
    }

    public void setSiteSeal(String siteSeal) {
        this.siteSeal = siteSeal;
    }

    public String getSecretQuestion1() {
        return secretQuestion1;
    }

    public void setSecretQuestion1(String secretQuestion1) {
        this.secretQuestion1 = secretQuestion1;
    }

    public String getSecretAnswer1() {
        return secretAnswer1;
    }

    public void setSecretAnswer1(String secretAnswer1) {
        this.secretAnswer1 = secretAnswer1;
    }

    public String getSecretQuestion2() {
        return secretQuestion2;
    }

    public void setSecretQuestion2(String secretQuestion2) {
        this.secretQuestion2 = secretQuestion2;
    }

    public String getSecretAnswer2() {
        return secretAnswer2;
    }

    public void setSecretAnswer2(String secretAnswer2) {
        this.secretAnswer2 = secretAnswer2;
    }

    public String getSecretQuestion3() {
        return secretQuestion3;
    }

    public void setSecretQuestion3(String secretQuestion3) {
        this.secretQuestion3 = secretQuestion3;
    }

    public String getSecretAnswer3() {
        return secretAnswer3;
    }

    public void setSecretAnswer3(String secretAnswer3) {
        this.secretAnswer3 = secretAnswer3;
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }
}
