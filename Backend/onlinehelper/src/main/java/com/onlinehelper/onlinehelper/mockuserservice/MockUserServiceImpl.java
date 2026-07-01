package com.onlinehelper.onlinehelper.mockuserservice;


import com.onlinehelper.onlinehelper.entity.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class MockUserServiceImpl implements MockUserService {


    // STORE LOCK STATUS
    private final Map<String, Boolean> lockMap =
            new ConcurrentHashMap<>();

    @Override
    public UserDetails getMockUserByUserId(
            String userId) {

        return buildMockUser(
                userId,
                "374245455400126"
        );
    }

    @Override
    public UserDetails getMockUserByCardNo(
            String cardNo) {

        return buildMockUser(
                "MOCKUSER001",
                cardNo
        );
    }

    @Override
    public UserDetails lockUser(
            String userId) {

        lockMap.put(userId, true);

        return buildMockUser(
                userId,
                "374245455400126"
        );
    }

    @Override
    public UserDetails unlockUser(
            String userId) {

        lockMap.put(userId, false);

        return buildMockUser(
                userId,
                "374245455400126"
        );
    }

    private UserDetails buildMockUser(
            String userId,
            String cardNo) {

        boolean isLocked =
                lockMap.getOrDefault(
                        userId,
                        false
                );

        UserDetails user =
                new UserDetails();

        user.setId(1L);

        user.setUserId(userId);

        user.setCardNo(cardNo);

        // STATUS
        user.setUserStatus(
                isLocked
                        ? "Locked"
                        : "Active"
        );

        user.setAccountStatus(
                isLocked
                        ? "Locked"
                        : "Unlocked"
        );

        user.setEmail(
                "john.doe@test.com"
        );

        user.setMobileNo(
                "9876543210"
        );

        user.setPowerCardId(
                "PWR12345"
        );

        user.setRegistrationDate(
                LocalDateTime.now()
                        .minusMonths(6)
        );

        user.setLastLogin(
                LocalDateTime.now()
        );

        user.setSiteSeal(
                "Blue Dolphin"
        );

        // SECRET QUESTIONS
        user.setSecretQuestion1(
                "What is your pet name?"
        );

        user.setSecretAnswer1(
                "Tommy"
        );

        user.setSecretQuestion2(
                "What is your birthplace?"
        );

        user.setSecretAnswer2(
                "Mumbai"
        );

        user.setSecretQuestion3(
                "What is your favorite color?"
        );

        user.setSecretAnswer3(
                "Black"
        );

        return user;
    }
}