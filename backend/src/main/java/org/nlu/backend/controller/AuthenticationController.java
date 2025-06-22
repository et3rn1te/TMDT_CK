package org.nlu.backend.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.nlu.backend.dto.ApiResponse;
import org.nlu.backend.dto.request.auth.AuthenticationRequest;
import org.nlu.backend.dto.request.auth.ForgotPasswordRequest;
import org.nlu.backend.dto.request.auth.NewPasswordRequest;
import org.nlu.backend.dto.response.UserResponse;
import org.nlu.backend.dto.response.auth.AuthenticationResponse;
import org.nlu.backend.dto.response.auth.ForgotPasswordResponse;
import org.nlu.backend.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {

    AuthenticationService authenticationService;

    @PostMapping("/login")
    ResponseEntity<ApiResponse<AuthenticationResponse>> login(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok()
                .body(ApiResponse.<AuthenticationResponse>builder()
                        .data(authenticationService.authenicate(request))
                        .build());
    }

    @PostMapping("/forgot-password")
    ResponseEntity<ApiResponse<ForgotPasswordResponse>> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        ApiResponse<ForgotPasswordResponse> apiResponse = ApiResponse.<ForgotPasswordResponse>builder()
                .data(authenticationService.forgotPassword(request))
                .build();
        return ResponseEntity.ok().body(apiResponse);
    }

    @PostMapping("/verify-otp")
    ResponseEntity<ApiResponse<String>> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        ApiResponse<String> apiResponse = ApiResponse.<String>builder()
                .data(authenticationService.verifyOtp(email, otp))
                .build();
        return ResponseEntity.ok().body(apiResponse);
    }

    @PostMapping("/new-password")
    ResponseEntity<ApiResponse<UserResponse>> resetPassword(@RequestBody NewPasswordRequest request) {
        ApiResponse<UserResponse> apiResponse = ApiResponse.<UserResponse>builder()
                .data(authenticationService.newPassword(request))
                .build();
        return ResponseEntity.ok().body(apiResponse);
    }
}
