package org.nlu.backend.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.nlu.backend.dto.ApiResponse;
import org.nlu.backend.dto.request.UserCreationRequest;
import org.nlu.backend.dto.response.UserResponse;
import org.nlu.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService userService;

    //-------------- GET MAPPING --------------
    @GetMapping
    ResponseEntity<ApiResponse<List<UserResponse>>> getUsers() {
        return ResponseEntity.ok()
                .body(ApiResponse.<List<UserResponse>>builder()
                        .data(userService.getAllUsers())
                        .build());
    }

    //-------------- POST MAPPING --------------
    @PostMapping
    ResponseEntity<ApiResponse<UserResponse>> createUser(@RequestBody UserCreationRequest request) {
        return ResponseEntity.ok()
                .body(ApiResponse.<UserResponse>builder()
                        .data(userService.createUser(request))
                        .build());
    }

}
