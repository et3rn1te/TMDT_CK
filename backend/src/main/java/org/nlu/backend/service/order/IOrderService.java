package org.nlu.backend.service.order;

import org.nlu.backend.dto.response.order.OrderResponse;

public interface IOrderService {
    /**
     * Get order details by ID
     * @param orderId The order ID
     * @return OrderResponse with details
     */
    OrderResponse getOrderById(Long orderId);
    
    /**
     * Check if a user has paid for a course
     * @param userId User ID
     * @param courseId Course ID
     * @return OrderResponse if payment exists, null otherwise
     */
    OrderResponse getOrderByCourseAndUser(Long courseId, Long userId);
}
