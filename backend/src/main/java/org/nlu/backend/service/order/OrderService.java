package org.nlu.backend.service.order;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.nlu.backend.dto.response.order.OrderDetailResponse;
import org.nlu.backend.dto.response.order.OrderResponse;
import org.nlu.backend.entity.Course;
import org.nlu.backend.entity.CourseEnrollment;
import org.nlu.backend.entity.Order;
import org.nlu.backend.entity.OrderDetail;
import org.nlu.backend.exception.AppException;
import org.nlu.backend.exception.ErrorCode;
import org.nlu.backend.mapper.CourseMapper;
import org.nlu.backend.repository.CourseEnrollmentRepository;
import org.nlu.backend.repository.CourseRepository;
import org.nlu.backend.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderService implements IOrderService {
    OrderRepository orderRepository;
    CourseEnrollmentRepository courseEnrollmentRepository;
    CourseRepository courseRepository;
    CourseMapper courseMapper;

    @Override
    public OrderResponse getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        
        return mapOrderToResponse(order);
    }

    @Override
    public OrderResponse getOrderByCourseAndUser(Long courseId, Long userId) {
        // Find enrollment for this course and user
        CourseEnrollment enrollment = courseEnrollmentRepository.findByUserIdAndCourseId(userId, courseId)
                .orElse(null);
        
        if (enrollment == null) {
            return null;
        }
        
        Order order = enrollment.getOrder();
        return mapOrderToResponse(order);
    }
    
    private OrderResponse mapOrderToResponse(Order order) {
        List<OrderDetailResponse> detailResponses = order.getOrderDetails().stream()
                .map(this::mapOrderDetailToResponse)
                .collect(Collectors.toList());
                
        return OrderResponse.builder()
                .id(order.getId())
                .orderNumber("ORD-" + order.getId())
                .createdAt(order.getCreatedAt())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .paymentMethod(order.getPaymentMethod())
                .paymentStatus(order.getPaymentStatus())
                .orderDetails(detailResponses)
                .build();
    }
    
    private OrderDetailResponse mapOrderDetailToResponse(OrderDetail detail) {
        return OrderDetailResponse.builder()
                .id(detail.getId())
                .price(detail.getPrice())
                .course(courseMapper.toCourseSummaryResponse(detail.getCourse()))
                .build();
    }
}
