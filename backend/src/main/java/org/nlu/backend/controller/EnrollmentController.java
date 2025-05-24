package org.nlu.backend.controller;

import lombok.RequiredArgsConstructor;
import org.nlu.backend.dto.request.course.enrollment.CourseEnrollmentRequest;
import org.nlu.backend.service.course.enrollment.IEnrollmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {
    private final IEnrollmentService enrollmentService;

    @PostMapping
    // thêm @AuthenticationPrincipal CustomUserDetails userDetails vào param để đăng ký
    public ResponseEntity<Void> enrollCourse(@RequestBody CourseEnrollmentRequest request) {
        // bỏ comment
        // Long userId = userDetails.getId(); // giả định bạn đã tích hợp Spring Security
        enrollmentService.enrollCourse(request.getUserId(), request);
        return ResponseEntity.ok().build();
    }
}

