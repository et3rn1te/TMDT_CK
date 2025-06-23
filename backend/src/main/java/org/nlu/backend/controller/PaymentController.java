package org.nlu.backend.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.nlu.backend.dto.ApiResponse;
import org.nlu.backend.dto.request.payment.BankWebhookRequest;
import org.nlu.backend.service.payment.IPaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentController {
    IPaymentService paymentService;

    @PostMapping("/webhook/bank")
    public ResponseEntity<ApiResponse<Object>> webhookBank(@RequestBody BankWebhookRequest request) {
        boolean success = paymentService.processBankWebhook(request);
        
        ApiResponse<Object> response = ApiResponse.builder()
                .code(success ? 200 : 400)
                .message(success ? "Payment processed successfully" : "Failed to process payment")
                .build();
                
        return ResponseEntity.status(success ? HttpStatus.OK : HttpStatus.BAD_REQUEST).body(response);
    }

    @GetMapping("/webhook/bank")
    public ResponseEntity<ApiResponse<String>> checkWebhookBank() {
        ApiResponse<String> response = ApiResponse.<String>builder()
                .code(200)
                .message("Success")
                .data("Webhook is working")
                .build();
        return ResponseEntity.ok(response);
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse<String>> index() {
        ApiResponse<String> response = ApiResponse.<String>builder()
                .code(200)
                .message("Success")
                .data("Payment API is working")
                .build();
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/check-status/{courseId}")
    public ResponseEntity<ApiResponse<Boolean>> checkPaymentStatus(
            @PathVariable Long courseId,
            @RequestParam Long userId) {
        boolean isPaid = paymentService.checkPaymentStatus(userId, courseId);
        
        ApiResponse<Boolean> response = ApiResponse.<Boolean>builder()
                .code(200)
                .message("Success")
                .data(isPaid)
                .build();
                
        return ResponseEntity.ok(response);
    }
}
