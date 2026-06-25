package com.onlinehelper.onlinehelper.mockuserservice;

import com.onlinehelper.onlinehelper.dto.SecretQuestionDto;
import com.onlinehelper.onlinehelper.dto.SupplementaryResponse;
import com.onlinehelper.onlinehelper.dto.UserDetailsDto;
import com.onlinehelper.onlinehelper.exception.UserNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class MockSupplementaryServiceImpl implements MockSupplementaryService {

    // Stores lock status per user
    private final Map<String, Boolean> userLockMap = new HashMap<>();

    // User -> Card mapping
    private final Map<String, String> userCardMap = Map.of(
            "MOCKUSER100", "374245455400999",
            "MOCKUSER200", "374245455401111"
    );

    @Override
    public SupplementaryResponse getMockByCardNumber(String cardNumber) {

        if (cardNumber == null || cardNumber.isBlank()) {
            throw new UserNotFoundException(
                    "Card number cannot be null or empty"
            );
        }

        String userId = userCardMap.entrySet()
                .stream()
                .filter(entry -> entry.getValue().equals(cardNumber))
                .map(Map.Entry::getKey)
                .findFirst()
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "Card number not found: " + cardNumber
                        ));

        return buildMockResponse(cardNumber, userId);
    }

    @Override
    public SupplementaryResponse getMockByUserId(String userId) {

        if (userId == null || userId.isBlank()) {
            throw new UserNotFoundException(
                    "User not found: " + userId
            );
        }

        String cardNumber = userCardMap.get(userId);

        if (cardNumber == null) {
            throw new UserNotFoundException(
                    "User not found: " + userId
            );
        }

        return buildMockResponse(cardNumber, userId);
    }

    @Override
    public SupplementaryResponse lockUser(String userId) {

        validateUser(userId);

        if (userLockMap.getOrDefault(userId, false)) {
            throw new IllegalStateException(
                    "User is already locked"
            );
        }

        userLockMap.put(userId, true);

        SupplementaryResponse response =
                buildMockResponse(
                        userCardMap.get(userId),
                        userId
                );

        response.setLockReason(
                "User manually locked"
        );

        return response;
    }

    @Override
    public SupplementaryResponse unlockUser(String userId) {

        validateUser(userId);

        if (!userLockMap.getOrDefault(userId, false)) {
            throw new IllegalStateException(
                    "User is already unlocked"
            );
        }

        userLockMap.put(userId, false);

        SupplementaryResponse response =
                buildMockResponse(
                        userCardMap.get(userId),
                        userId
                );

        response.setLockReason(null);

        return response;
    }

    private void validateUser(String userId) {

        if (userId == null || userId.isBlank()) {
            throw new UserNotFoundException(
                    "User ID cannot be null or empty"
            );
        }

        if (!userCardMap.containsKey(userId)) {
            throw new UserNotFoundException(
                    "User not found: " + userId
            );
        }
    }

    private SupplementaryResponse buildMockResponse(
            String cardNumber,
            String userId) {

        SupplementaryResponse response =
                new SupplementaryResponse();

        boolean isLocked =
                userLockMap.getOrDefault(userId, false);

        response.setCardNumber(cardNumber);
        response.setUserId(userId);
        response.setModifiedBy("SYSTEM");

        response.setLocked(isLocked);
        response.setLockStatus(
                isLocked ? "LOCKED" : "ACTIVE"
        );

        UserDetailsDto userDetails =
                new UserDetailsDto();

        if ("MOCKUSER200".equals(userId)) {

            response.setAccessId(2002L);
            response.setAccessGroupId("GRP-200");

            userDetails.setUserStatus(
                    isLocked ? "LOCKED" : "ACTIVE"
            );

            userDetails.setEmail(
                    "john.smith@test.com"
            );

            userDetails.setMobileNo(
                    "9999999999"
            );

            userDetails.setRegistrationDate(
                    LocalDateTime.now()
                            .minusMonths(3)
                            .toString()
            );

            userDetails.setLastLogin(
                    LocalDateTime.now()
                            .minusHours(2)
                            .toString()
            );

        } else {

            response.setAccessId(1001L);
            response.setAccessGroupId("GRP-100");

            userDetails.setUserStatus(
                    isLocked ? "LOCKED" : "ACTIVE"
            );

            userDetails.setEmail(
                    "supp.user@test.com"
            );

            userDetails.setMobileNo(
                    "8888888888"
            );

            userDetails.setRegistrationDate(
                    LocalDateTime.now()
                            .minusMonths(8)
                            .toString()
            );

            userDetails.setLastLogin(
                    LocalDateTime.now()
                            .toString()
            );
        }

        response.setUserDetails(userDetails);

        List<SecretQuestionDto> questions =
                new ArrayList<>();

        SecretQuestionDto q1 =
                new SecretQuestionDto();

        SecretQuestionDto q2 =
                new SecretQuestionDto();

        if ("MOCKUSER200".equals(userId)) {

            q1.setQuestion(
                    "What is your birthplace?"
            );
            q1.setAnswer("Mumbai");

            q2.setQuestion(
                    "What is your favorite color?"
            );
            q2.setAnswer("Blue");

        } else {

            q1.setQuestion(
                    "What is your favorite movie?"
            );
            q1.setAnswer("Inception");

            q2.setQuestion(
                    "What is your pet name?"
            );
            q2.setAnswer("Bruno");
        }

        questions.add(q1);
        questions.add(q2);

        response.setSecretQuestions(questions);

        return response;
    }
}

