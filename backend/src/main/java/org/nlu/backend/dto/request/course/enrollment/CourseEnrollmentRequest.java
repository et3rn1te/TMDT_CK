package org.nlu.backend.dto.request.course.enrollment;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.nlu.backend.entity.Order;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CourseEnrollmentRequest {
    private Long userId;
    private Long courseId;
    private Order.PaymentMethod paymentMethod; // CREDIT_CARD, PAYPAL, etc.
}
