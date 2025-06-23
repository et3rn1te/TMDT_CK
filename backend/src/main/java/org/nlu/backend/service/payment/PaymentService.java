package org.nlu.backend.service.payment;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.nlu.backend.dto.request.payment.BankWebhookRequest;
import org.nlu.backend.entity.*;
import org.nlu.backend.exception.AppException;
import org.nlu.backend.exception.ErrorCode;
import org.nlu.backend.repository.CourseEnrollmentRepository;
import org.nlu.backend.repository.CourseRepository;
import org.nlu.backend.repository.OrderRepository;
import org.nlu.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentService implements IPaymentService {

    CourseRepository courseRepository;
    UserRepository userRepository;
    OrderRepository orderRepository;
    CourseEnrollmentRepository courseEnrollmentRepository;

    private static final Pattern CONTENT_PATTERN = Pattern.compile("COURSE(\\d+)USER(\\d+)");

    @Override
    @Transactional
    public boolean processBankWebhook(BankWebhookRequest request) {
        // Only process incoming transfers
        if (!"in".equalsIgnoreCase(request.getTransferType())) {
            return false;
        }

        // Parse the content to extract course ID and user ID
        Matcher matcher = CONTENT_PATTERN.matcher(request.getContent());
        if (!matcher.find()) {
            return false;
        }

        try {
            Long courseId = Long.parseLong(matcher.group(1));
            Long userId = Long.parseLong(matcher.group(2));

            // Fetch the course and user
            Course course = courseRepository.findById(courseId)
                    .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

            // Check if the user is already enrolled in the course
            if (courseEnrollmentRepository.existsByUserIdAndCourseId(userId, courseId)) {
                return false; // Already enrolled, don't process again
            }

            // Check if the payment amount is sufficient
            if (course.getDiscountPrice() != null && 
                request.getTransferAmount().compareTo(course.getDiscountPrice()) >= 0) {
                // Create order
                Order order = createOrder(user, course, request);
                
                // Create order detail
                OrderDetail orderDetail = createOrderDetail(order, course);
                
                // Create course enrollment
                createCourseEnrollment(user, course, order);
                
                return true;
            } else if (course.getDiscountPrice() == null && 
                       request.getTransferAmount().compareTo(course.getPrice()) >= 0) {
                // Create order
                Order order = createOrder(user, course, request);
                
                // Create order detail
                OrderDetail orderDetail = createOrderDetail(order, course);
                
                // Create course enrollment
                createCourseEnrollment(user, course, order);
                
                return true;
            }
        } catch (Exception e) {
            // Log the exception
            e.printStackTrace();
            return false;
        }

        return false;
    }
    
    @Override
    public boolean checkPaymentStatus(Long userId, Long courseId) {
        // Check if the user is enrolled in the course
        return courseEnrollmentRepository.existsByUserIdAndCourseId(userId, courseId);
    }

    private Order createOrder(User user, Course course, BankWebhookRequest request) {
        Order order = Order.builder()
                .user(user)
                .totalAmount(course.getDiscountPrice() != null ? course.getDiscountPrice() : course.getPrice())
                .status(Order.OrderStatus.COMPLETED)
                .paymentMethod(Order.PaymentMethod.BANK_TRANSFER)
                .paymentStatus(Order.PaymentStatus.COMPLETED)
                .orderDetails(new HashSet<>())
                .enrollments(new HashSet<>())
                .build();
        
        return orderRepository.save(order);
    }

    private OrderDetail createOrderDetail(Order order, Course course) {
        OrderDetail orderDetail = OrderDetail.builder()
                .order(order)
                .course(course)
                .price(course.getDiscountPrice() != null ? course.getDiscountPrice() : course.getPrice())
                .build();
        
        order.getOrderDetails().add(orderDetail);
        
        return orderDetail;
    }

    private CourseEnrollment createCourseEnrollment(User user, Course course, Order order) {
        CourseEnrollment enrollment = CourseEnrollment.builder()
                .user(user)
                .course(course)
                .order(order)
                .enrollmentDate(LocalDateTime.now())
                .build();
        
        order.getEnrollments().add(enrollment);
        
        return courseEnrollmentRepository.save(enrollment);
    }
}
