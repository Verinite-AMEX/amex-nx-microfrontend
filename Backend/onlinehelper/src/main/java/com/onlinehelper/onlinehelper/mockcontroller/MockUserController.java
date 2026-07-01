package com.onlinehelper.onlinehelper.mockcontroller;



import com.onlinehelper.onlinehelper.entity.UserDetails;
import com.onlinehelper.onlinehelper.mockuserservice.MockUserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mock/accounts")
@CrossOrigin(origins = "*")
public class MockUserController {

    private final MockUserService mockUserService;

    public MockUserController(MockUserService mockUserService) {
        this.mockUserService = mockUserService;
    }


    @GetMapping("/hello")
    public String getData() {

        return "Hello from mock controller";
    }

    @GetMapping("/user/{userId}")
    public UserDetails getMockUser(
            @PathVariable String userId) {

        System.out.println("user id from user controller"+userId);
        return mockUserService
                .getMockUserByUserId(userId);
    }

    @GetMapping("/card/{cardNo}")
    public UserDetails getMockUserByCard(
            @PathVariable String cardNo) {

        return mockUserService
                .getMockUserByCardNo(cardNo);
    }

    // LOCK USER
    @PostMapping("/lock/{userId}")
    public UserDetails lockUser(
            @PathVariable String userId) {

        return mockUserService
                .lockUser(userId);
    }

    // UNLOCK USER
    @PostMapping("/unlock/{userId}")
    public UserDetails unlockUser(
            @PathVariable String userId) {

        return mockUserService
                .unlockUser(userId);
    }
}
