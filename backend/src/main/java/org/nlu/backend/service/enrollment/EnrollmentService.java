package org.nlu.backend.service.enrollment;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.nlu.backend.dto.request.enrollment.CourseEnrollmentRequest;
import org.nlu.backend.dto.response.course.EnrolledCourseResponse;
import org.nlu.backend.entity.*;
import org.nlu.backend.repository.*;
import org.nlu.backend.exception.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EnrollmentService implements IEnrollmentService {
    CourseRepository courseRepository;
    UserRepository userRepository;
    OrderRepository orderRepository;
    CourseEnrollmentRepository enrollmentRepository;

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
    
    @Override
    public List<EnrolledCourseResponse> getEnrolledCourses() {
        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));

        List<CourseEnrollment> enrollments = enrollmentRepository.findByUserId(user.getId());
        return enrollments.stream()
                .map(enrollment -> {
                    Course course = enrollment.getCourse();
                    return EnrolledCourseResponse.builder()
                            .id(course.getId())
                            .title(course.getTitle())
                            .description(course.getDescription())
                            .thumbnail(course.getThumbnailUrl())
                            .price(course.getPrice())
                            .instructorName(course.getSeller().getFullName())
                            .enrollmentDate(enrollment.getCreatedAt())
                            .progress(calculateProgress(enrollment))
                            .status(enrollment.getCourse().getStatus())
                            .build();
                })
                .collect(Collectors.toList());
    }

    private Double calculateProgress(CourseEnrollment enrollment) {
        // TODO: Implement progress calculation based on completed lessons
        return 0.0;
    }
}

