package org.nlu.backend.dto.response.order;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.nlu.backend.dto.response.course.CourseSummaryResponse;
import org.nlu.backend.entity.Order;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponse {
    Long id;
    String orderNumber;
    LocalDateTime createdAt;
    BigDecimal totalAmount;
    Order.OrderStatus status;
    Order.PaymentMethod paymentMethod;
    Order.PaymentStatus paymentStatus;
    List<OrderDetailResponse> orderDetails;
} 