package com.onlinehelper.onlinehelper.mockuserservice;

import com.onlinehelper.onlinehelper.entity.UserDetails;
import org.springframework.stereotype.Service;

@Service
public interface MockUserService {
    UserDetails getMockUserByUserId(String userId);

    UserDetails getMockUserByCardNo(String cardNo);

    // NEW METHODS
    UserDetails lockUser(String userId);

    UserDetails unlockUser(String userId);
}
