package com.onlinehelper.onlinehelper.dto;

import lombok.Data;

import java.util.List;

@Data
public class SupplementaryResponse {

    private Long accessId;
    private String accessGroupId;
    private String cardNumber;
    private String userId;
    private String modifiedBy;

    // NEW FIELDS
    private boolean locked;
    private String lockReason;
    private String lockStatus;

    private UserDetailsDto userDetails;

    private List<SecretQuestionDto> secretQuestions;
}