package com.onlinehelper.onlinehelper.mockuserservice;

import com.onlinehelper.onlinehelper.entity.UserDetails;
import com.onlinehelper.onlinehelper.exception.UserNotFoundException;

import jakarta.annotation.PostConstruct;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class MockUserServiceImpl implements MockUserService {

    // Store lock status
    private final Map<String, Boolean> lockMap = new ConcurrentHashMap<>();

    // Mock database
    private final Map<String, UserDetails> userIdMap = new ConcurrentHashMap<>();
    private final Map<String, UserDetails> cardNoMap = new ConcurrentHashMap<>();

    @PostConstruct
    public void init() {

        UserDetails user1 = buildMockUser(
                "MOCKUSER001",
                "374245455400126"
        );

        UserDetails user2 = buildMockUser(
                "SACHIN001",
                "374512345678901"
        );

        userIdMap.put(user1.getUserId(), user1);
        userIdMap.put(user2.getUserId(), user2);

        cardNoMap.put(user1.getCardNo(), user1);
        cardNoMap.put(user2.getCardNo(), user2);
    }

   @Override
public UserDetails getMockUserByUserId(String userId) {

    if (userId == null || userId.isBlank()) {
        throw new IllegalArgumentException(
                "User ID cannot be empty"
        );
    }

    UserDetails user = userIdMap.get(userId);

    if (user == null) {
        throw new UserNotFoundException(
                "User not found: " + userId
        );
    }

    applyLockStatus(user);

    return user;
}

   @Override
public UserDetails getMockUserByCardNo(String cardNo) {

    if (cardNo == null || cardNo.isBlank()) {
        throw new IllegalArgumentException(
                "Card number cannot be empty"
        );
    }

    UserDetails user = cardNoMap.get(cardNo);

    if (user == null) {
        throw new UserNotFoundException(
                "Card not found: " + cardNo
        );
    }

    applyLockStatus(user);

    return user;
}

   @Override
public UserDetails lockUser(String userId) {

    UserDetails user = userIdMap.get(userId);

    if (user == null) {
        throw new UserNotFoundException(
                "User not found: " + userId
        );
    }

    lockMap.put(userId, true);

    applyLockStatus(user);

    return user;
}

    @Override
public UserDetails unlockUser(String userId) {

    UserDetails user = userIdMap.get(userId);

    if (user == null) {
        throw new UserNotFoundException(
                "User not found: " + userId
        );
    }

    lockMap.put(userId, false);

    applyLockStatus(user);

    return user;
}

    private void applyLockStatus(UserDetails user) {

        boolean locked = lockMap.getOrDefault(
                user.getUserId(),
                false
        );

        user.setUserStatus(
                locked ? "Locked" : "Active"
        );

        user.setAccountStatus(
                locked ? "Locked" : "Unlocked"
        );
    }

    private UserDetails buildMockUser(
            String userId,
            String cardNo) {

        UserDetails user = new UserDetails();

        user.setId(1L);

        user.setUserId(userId);

        user.setCardNo(cardNo);

        user.setUserStatus("Active");

        user.setAccountStatus("Unlocked");

        user.setEmail("john.doe@test.com");

        user.setMobileNo("9876543210");

        user.setPowerCardId("PWR12345");

        user.setRegistrationDate(
                LocalDateTime.now().minusMonths(6)
        );

        user.setLastLogin(
                LocalDateTime.now()
        );

        user.setSiteSeal("Blue Dolphin");

        user.setSecretQuestion1("What is your pet name?");
        user.setSecretAnswer1("Tommy");

        user.setSecretQuestion2("What is your birthplace?");
        user.setSecretAnswer2("Mumbai");

        user.setSecretQuestion3("What is your favorite color?");
        user.setSecretAnswer3("Black");

        return user;
    }
}