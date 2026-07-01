package com.onlinehelper.onlinehelper.dto;

import jakarta.validation.constraints.Size;

public class SearchRequest {
    @Size(min = 5, max = 16, message = "Invalid Card Number")
    private String cardNo;

    @Size(min = 3, max = 20, message = "Invalid User Id")
    private String userId;

    public String getCardNo() { return cardNo; }
    public void setCardNo(String cardNumber) { this.cardNo = cardNo; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
}
