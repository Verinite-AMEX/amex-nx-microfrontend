package com.onlinehelper.onlinehelper.dto;

import lombok.Data;

import java.util.List;

@Data
public class SupplementaryRequest {

    private String accessGroupId;
    private String cardNumber;
    private String userId;
    private UserDetailsDto userDetails;
    private List<SecretQuestionDto> secretQuestions;
    private String modifiedBy;
}