package org.nlu.backend.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.nlu.backend.dto.ApiResponse;
import org.nlu.backend.dto.response.order.OrderResponse;
import org.nlu.backend.service.order.IOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {
    IOrderService orderService;
    
    @GetMapping("/{orderId}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrderById(@PathVariable Long orderId) {
        OrderResponse order = orderService.getOrderById(orderId);
        return ResponseEntity.ok(ApiResponse.<OrderResponse>builder()
                .code(200)
                .message("Success")
                .data(order)
                .build());
    }
    
    @GetMapping("/check")
    public ResponseEntity<ApiResponse<OrderResponse>> checkOrderByCourseAndUser(
            @RequestParam Long courseId,
            @RequestParam Long userId) {
        OrderResponse order = orderService.getOrderByCourseAndUser(courseId, userId);
        return ResponseEntity.ok(ApiResponse.<OrderResponse>builder()
                .code(200)
                .message("Success")
                .data(order)
                .build());
    }
}
