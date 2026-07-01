package com.onlinehelper.onlinehelper.mockcontroller;


import com.onlinehelper.onlinehelper.dto.SupplementaryResponse;
import com.onlinehelper.onlinehelper.mockuserservice.MockSupplementaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mock/supplementary")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MockSupplementaryController {

    private final MockSupplementaryService service;

    @GetMapping("/card/{cardNumber}")
    public SupplementaryResponse getByCardNumber(
            @PathVariable String cardNumber) {

        return service.getMockByCardNumber(cardNumber);
    }

    @GetMapping("/user/{userId}")
    public SupplementaryResponse getByUserId(
            @PathVariable String userId) {

        return service.getMockByUserId(userId);
    }


    // LOCK USER
    @PostMapping("/lock/{userId}")
    public SupplementaryResponse lockUser(
            @PathVariable String userId) {

        return service.lockUser(userId);
    }

    // UNLOCK USER
    @PostMapping("/unlock/{userId}")
    public SupplementaryResponse unlockUser(
            @PathVariable String userId) {

        return service.unlockUser(userId);
    }
}
