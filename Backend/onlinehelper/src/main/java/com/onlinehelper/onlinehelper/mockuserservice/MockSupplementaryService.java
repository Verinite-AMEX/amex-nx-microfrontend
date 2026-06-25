package com.onlinehelper.onlinehelper.mockuserservice;

import com.onlinehelper.onlinehelper.dto.SupplementaryResponse;

public interface MockSupplementaryService {
    SupplementaryResponse getMockByCardNumber(String cardNumber);

    SupplementaryResponse getMockByUserId(String userId);

    SupplementaryResponse lockUser(String userId);

    SupplementaryResponse unlockUser(String userId);
}