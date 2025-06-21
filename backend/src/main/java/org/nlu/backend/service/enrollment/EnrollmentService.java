package org.nlu.backend.service.enrollment;

import lombok.RequiredArgsConstructor;
import org.nlu.backend.dto.request.enrollment.CourseEnrollmentRequest;
import org.nlu.backend.entity.*;
import org.nlu.backend.repository.*;
import org.nlu.backend.exception.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EnrollmentService implements IEnrollmentService {
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final CourseEnrollmentRepository enrollmentRepository;

    @Transactional
    public void enrollCourse(Long userId, CourseEnrollmentRequest request) {
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        // Check if already enrolled
        boolean alreadyEnrolled = enrollmentRepository.existsByUserIdAndCourseId(userId, course.getId());
        if (alreadyEnrolled) {
            throw new AppException(ErrorCode.ALREADY_ENROLLED);
        }

        // Tạo Order mới
        Order order = new Order();
        order.setUser(user);
        order.setTotalAmount(course.getDiscountPrice() != null ? course.getDiscountPrice() : course.getPrice());
        order.setPaymentMethod(request.getPaymentMethod());
        order.setStatus(Order.OrderStatus.COMPLETED); // Giả lập thanh toán
        order.setPaymentStatus(Order.PaymentStatus.COMPLETED);
        order = orderRepository.save(order);

        // Tạo Enrollment
        CourseEnrollment enrollment = new CourseEnrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);
        enrollment.setOrder(order);
        enrollment.setEnrollmentDate(LocalDateTime.now());
        enrollmentRepository.save(enrollment);
    }
}

